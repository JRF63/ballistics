import React from "react";

export function Table(): React.ReactNode {
  const ranges = new Array<number>();
  const rangeStepSize = 100.0;
  const maxRange = 2000.0;
  let i = 0;
  while (true) {
    let range = i * rangeStepSize;
    if (range > maxRange) {
      break;
    }
    ranges.push(range);
    i++;
  }
  return (
    <table>
      <tr>
        <th>Range</th>
        <th>Elevation</th>
        <th>Elevation</th>
        <th>Windage</th>
        <th>Windage</th>
        <th>Bullet speed</th>
        <th>Energy</th>
        <th>Time</th>
      </tr>
      {
        ranges.map((r) =>
          <tr>
            <td>{r}</td>
            <td>0.0</td>
            <td>0.0</td>
            <td>0.0</td>
            <td>0.0</td>
            <td>0.0</td>
            <td>0.0</td>
            <td>0.0</td>
          </tr>
        )
      }
    </table>
  );
}
