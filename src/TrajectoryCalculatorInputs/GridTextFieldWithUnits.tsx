import FormControl from "@mui/material/FormControl";
import TextField from "@mui/material/TextField";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import Grid from "@mui/material/Unstable_Grid2";
import InputLabel from "@mui/material/InputLabel";

interface ToNumber {
  toNumber(): number;
}

export type GridTextFieldWithUnitsProps<T extends ToNumber> = {
  name: string;
  units: Array<[T, string]>;
  defaultUnit: T;
};

export function GridTextFieldWithUnits<T extends ToNumber>({
  name,
  units,
  defaultUnit,
}: GridTextFieldWithUnitsProps<T>) {

  const nameId = name.toLowerCase().replace(" ", "-");
  const unitsId = nameId + "-units";
  const unitsIdLabel = unitsId + "-label";

  return (
    <>
      <Grid xs={8}>
        <FormControl fullWidth>
          <TextField
            id={nameId}
            label={name}
            variant="outlined"
          />
        </FormControl>
      </Grid>
      <Grid xs={4}>
        <FormControl fullWidth>
          <InputLabel id={unitsIdLabel}>Units</InputLabel>
          <Select
            labelId={unitsIdLabel}
            id={unitsId}
            value={defaultUnit.toNumber()}
            label="Units"
          >
            {units.map(([unit, label]) => (
              // toNumber is used here because the value prop of MenuItem
              // only accepts string and numbers
              <MenuItem value={unit.toNumber()}>{label}</MenuItem>
            ))}
          </Select>
        </FormControl>
      </Grid>
    </>
  );
}
