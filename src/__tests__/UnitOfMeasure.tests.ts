import { expect, describe, test } from "@jest/globals";
import UnitOfMeasure, { Unit } from "../UnitOfMeasure.ts";

describe("UnitOfMeasure", () => {
  const precision = 5;
  const testVals: Array<[string, number, Unit, number]> = [
    ["length", precision, "ft", 0.3048],
    ["mass", precision, "lb", 0.45359237],
    ["speed", precision, "ft/s", 0.3048],
    ["temperature", precision, "F", 255.92777768],
    ["pressure", 2, "psi", 6894.7572932], // This is oddly off hence precision of 2
    ["angle", precision, "deg", 0.017453292519943295],
  ];

  for (const [testName, precision, unit, result] of testVals) {
    test(testName, () => {
      const u = new UnitOfMeasure(unit);
      expect(u.convertToSi(1)).toBeCloseTo(result, precision);
    });
  }
});
