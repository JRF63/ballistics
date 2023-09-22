use ballistics_rs::prelude::{
    calc_trajectory, create_standard_drag_function, solve_initial_velocity, FloatType, OdeSolver,
    StandardDragFunction, Vector3, State,
};
use wasm_bindgen::prelude::*;

#[wasm_bindgen]
#[derive(Copy, Clone, Debug)]
pub enum DragFunctionType {
    G1,
    G7,
    Custom,
}

#[wasm_bindgen]
pub struct SolverStep {
    y: State,
    yp: State,
    t: FloatType,
}

#[wasm_bindgen]
pub fn calc_trajectory_wasm(
    muzzle_speed: FloatType,
    bc: FloatType,
    drag_func_type: DragFunctionType,
    _bullet_mass: FloatType,
    sight_height: FloatType,

    wind_speed: FloatType,
    wind_direction: FloatType,

    temp: FloatType,
    pressure: FloatType,
    rh: FloatType,
    elevation: FloatType,

    zero_range: FloatType,
    zero_elevation: FloatType,

    dt: FloatType,
    t_max: FloatType,

    max_range: FloatType,
) -> js_sys::Array {
    let drag_func = match drag_func_type {
        DragFunctionType::Custom => unimplemented!(),
        DragFunctionType::G1 => create_standard_drag_function(StandardDragFunction::G1, bc),
        DragFunctionType::G7 => create_standard_drag_function(StandardDragFunction::G7, bc),
    };

    let (w_sin, w_cos) = wind_direction.to_radians().sin_cos();
    let wind = wind_speed * Vector3::new(w_cos, w_sin, 0.0);

    let x0 = Vector3::new(0.0, 0.0, elevation - sight_height);

    let (ver_angle, hor_angle) = solve_initial_velocity(
        x0,
        muzzle_speed,
        drag_func,
        zero_range,
        zero_elevation,
        wind,
        temp,
        pressure,
        rh,
        elevation,
        dt,
        t_max,
    )
    .unwrap();

    let output = js_sys::Array::new();

    let v0 = muzzle_speed
        * Vector3::new(
            ver_angle.cos() * hor_angle.cos(),
            hor_angle.sin(),
            ver_angle.sin() * hor_angle.cos(),
        );

    let stop_eval = |solver: &OdeSolver| -> bool {
        let (y, yp, t) = solver.current_state();
        let ss = SolverStep {
            y: y.clone(),
            yp: yp.clone(),
            t
        };
        output.push(&ss.into());
        y.pos.x > max_range
    };

    calc_trajectory(
        x0, v0, drag_func, wind, temp, pressure, rh, elevation, dt, t_max, stop_eval,
    );

    output
}
