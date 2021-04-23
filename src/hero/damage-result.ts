/// <reference path="damage-type.ts" />
namespace Hero {
  /**
   * Represents the result of a damage roll.
   */
  export interface DamageResult {
    body: number
    stun: number
    type: DamageType
  }
}
