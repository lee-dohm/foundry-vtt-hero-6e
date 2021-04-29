import { InvalidDamageFormulaError } from './errors/invalid-damage-formula-error'
import { DamageResult } from './damage-result'
import { DamageType } from './damage-type'

const damageRollPattern = /^\d*(\.5|½)?d6([+-]1)?[kn]?$/i

export function rollDamage(formula: string): DamageResult {
  const trimmed = formula.trim()

  if (!validateDamageRoll(trimmed)) {
    throw new InvalidDamageFormulaError(trimmed)
  }

  return {
    body: 0,
    stun: 0,
    type: DamageType.NORMAL
  }
}

export function validateDamageRoll(formula: string): boolean {
  return formula.match(damageRollPattern) !== null
}
