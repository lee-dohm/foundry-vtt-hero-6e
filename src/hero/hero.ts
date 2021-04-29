import { InvalidDamageFormulaError } from './errors/invalid-damage-formula-error'
import { DamageResult } from './damage-result'
import { DamageType } from './damage-type'

const damageRollPattern = /^\d*(\.5|½)?d6([+-]1)?[kn]?$/i

/**
 * Rolls damage according to the Hero system based on the `formula` given.
 *
 * Hero damage rolls are listed like fairly normal dice rolls with one major
 * difference. Since there are two different ways of calculating damage in the
 * Hero system, one has to specify which type of damage the roll is for. This
 * is often done by including an `N` (for normal damage) or `K` (for killing
 * damage) at the end. If neither is specified, normal damage is often assumed,
 * so that is how this function will interpret it.
 *
 * See `6E2 98` for details.
 *
 * @param formula A Hero damage roll formula
 * @returns Amount of damage rolled
 */
export function rollDamage(formula: string): DamageResult {
  const trimmed = formula.trim()

  if (!_validateDamageRoll(trimmed)) {
    throw new InvalidDamageFormulaError(trimmed)
  }

  return {
    body: 0,
    stun: 0,
    type: DamageType.NORMAL
  }
}

/**
 * Validates the supplied damage roll `formula`.
 *
 * @param formula A Hero damage roll formula to validate
 * @returns `true` if the formula is a valid Hero damage roll; `false` otherwise
 */
export function _validateDamageRoll(formula: string): boolean {
  return formula.match(damageRollPattern) !== null
}
