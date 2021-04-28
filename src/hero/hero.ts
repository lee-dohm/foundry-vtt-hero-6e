import { InvalidDamageFormulaError } from './errors/invalid-damage-formula-error'
import { DamageResult } from './damage-result'
import { DamageType } from './damage-type'

const damageRollPattern = /\d*(\.5)?d6([+-]1)?[kKnN]?/

export function rollDamage(formula: string): DamageResult {
  const trimmed = formula.trim()

  if (!trimmed.match(damageRollPattern)) {
    throw new InvalidDamageFormulaError(trimmed)
  }

  return {
    body: 0,
    stun: 0,
    type: DamageType.NORMAL
  }
}
