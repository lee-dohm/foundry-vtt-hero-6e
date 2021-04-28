export class InvalidDamageFormulaError extends Error {
  constructor(formula: string) {
    super(`Invalid damage formula: ${formula}`)
    this.name = "InvalidDamageFormulaError"
  }
}
