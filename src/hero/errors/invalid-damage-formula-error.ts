/**
 * Raised when an invalid damage roll formula is detected.
 */
export class InvalidDamageFormulaError extends Error {
  constructor(formula: string) {
    super(`Invalid damage formula: ${formula}`)
    this.name = "InvalidDamageFormulaError"
  }
}
