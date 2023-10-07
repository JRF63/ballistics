import convert from "convert-units";

// Units not supported by `convert-units`
export type CustomUnit = "lbm/in²" | "gr";

export type Unit = convert.Unit | CustomUnit;

const measureTable: Map<convert.Measure, convert.Unit> = new Map([
  ["length", "m"],
  ["mass", "kg"],
  ["speed", "m/s"],
  ["temperature", "K"],
  ["pressure", "Pa"],
  ["angle", "rad"],
]);

const customUnitConversionTable: Map<Unit, number> =
  new Map([
    ["lbm/in²", 1],
    ["gr", 64.79891e-6], // 1 grain == 64.79891 mg
  ]);

export default class UnitOfMeasure {
  unit: Unit;

  constructor(unit: Unit) {
    this.unit = unit;
  }
  convertToSi(value: number): number {
    const conversionFactor = customUnitConversionTable.get(this.unit);

    if (conversionFactor !== undefined) {
      return value * conversionFactor;

    // `map.get` returned `undefined` so `this.unit` is a `convert.Unit`
    } else {
      try {
        // Force convert to a `convert.Unit`
        const unit = this.unit as convert.Unit;

        // This would throw if `this.unit` is not a `convert.Unit`
        const description = convert().describe(unit);

        const siEquivalent = measureTable.get(description.measure);
        if (siEquivalent !== undefined) {
          return convert(value).from(unit).to(siEquivalent);
        }

        // Falls to throw below
      } catch (_error) {
        /* empty */
      }

      throw new Error("Unknown measure for the given unit");
    }
  }
}
