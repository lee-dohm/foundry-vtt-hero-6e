import { DamageType } from './damage-type'

/**
 * Represents the result of a damage roll.
 */
export interface DamageResult {
  body: number
  stun: number
  type: DamageType
}
