import { Evaluated } from '@league-of-foundry-developers/foundry-vtt-types/src/foundry/foundry.js/roll'
import { HERO_CONFIG } from './config.js'

/**
 * A normal damage roll.
 */
export interface HeroNormalDamage {
  /** Amount of `BODY` damage done.  */
  body: number

  /** Dice roll that determined the amount of damage. */
  damageRoll: Evaluated<Roll>

  /** Amount of `STUN` damage done. */
  stun: number

  /** Type of damage. */
  type: 'normal'
}

/**
 * A killing damage roll.
 */
export interface HeroKillingDamage {
  /** Amount of `BODY` damage done. */
  body: number

  /** Dice roll that determined the amount of damage. */
  damageRoll: Evaluated<Roll>

  /** Amount of `STUN` damage done. */
  stun: number

  /** Dice roll that determined the `STUN` multiplier. */
  stunMultRoll: Evaluated<Roll>

  /** Type of damage. */
  type: 'killing'
}

interface DamageRollProps {
  full: string
  half: string
  mod: string
}

export type HeroDamage = HeroNormalDamage | HeroKillingDamage

/** Regex used to match and parse a Hero damage formula. */
const DAMAGE_PATTERN = /^(?<full>\d+)?(?<half>\.5|½)?d6(?<mod>(\+|-)\d+)?$/i

/**
 * Raised when an invalid damage formula is given to a roll damage function.
 *
 * See **6E2 97** for a representative list of valid damage formulas.
 */
export class InvalidDamageFormulaError extends Error {
  formula: string

  constructor(formula: string) {
    const message = `Invalid damage formula: ${formula}`
    super(message)

    this.name = 'InvalidDamageFormulaError'
    this.formula = formula
  }
}

/**
 * Rolls and calculates the amount of `STUN` and `BODY` damage indicated by the dice.
 *
 * @param formula Killing damage dice formula
 * @param stunMultFormula Stun multiplier dice formula
 * @returns An object describing the amonut of `STUN`, `BODY`,
 * and type of damage.
 */
export async function rollKillingDamage(
  formula: string,
  stunMultFormula = HERO_CONFIG.damage.stunMultFormula
) {
  const match = formula.match(DAMAGE_PATTERN)

  if (!match || !match.groups) {
    throw new InvalidDamageFormulaError(formula)
  }

  const damageFormula = buildDamageFormula((match.groups as unknown) as DamageRollProps)
  const damageRoll = new Roll(damageFormula)
  const damageRolled = await damageRoll.evaluate({ async: true })

  const stunMultRoll = new Roll(stunMultFormula)
  const stunMultRolled = await stunMultRoll.evaluate({ async: true })

  return calculateKillingDamage(damageRolled, stunMultRolled)
}

/**
 * Rolls and calculates the amount of `STUN` and `BODY` damage indicated by the dice.
 *
 * @param formula Normal damage dice formula, ex: `3d6`, `6.5d6`, or `4½d6+1`
 * @returns An object describing the amount of `STUN`, `BODY`, and type of damage.
 */
export async function rollNormalDamage(formula: string) {
  const match = formula.match(DAMAGE_PATTERN)

  if (!match) {
    throw new InvalidDamageFormulaError(formula)
  }

  const damageFormula = buildDamageFormula((match.groups as unknown) as DamageRollProps)
  const damageRoll = new Roll(damageFormula)
  const damageRolled = await damageRoll.evaluate({ async: true })

  return calculateNormalDamage(damageRolled)
}

function buildDamageFormula({ full, half, mod }: DamageRollProps) {
  const fullDice = `${full}d6[full dice]`
  const halfDice = half ? '1d6[half dice]' : ''

  return `${fullDice}${halfDice}${mod}`
}

function calculateKillingDamage(
  damageRoll: Evaluated<Roll>,
  stunMultRoll: Evaluated<Roll>
): HeroKillingDamage {
  let body = damageRoll.total

  for (const term of damageRoll.terms) {
    if (term instanceof Die && term.total && term.options.flavor === 'halfdice') {
      body -= term.total
      body += Math.ceil(term.total / 2)
    }
  }

  let stun = body * stunMultRoll.total

  return { body, stun, damageRoll, stunMultRoll, type: 'killing' }
}

function calculateNormalDamage(roll: Evaluated<Roll>): HeroNormalDamage {
  let stun = roll.total
  let body = 0

  for (const term of roll.terms) {
    if (term instanceof Die) {
      if (term.options.flavor === 'fulldice') {
        body += countNormalBodyFullDice(term)
      } else if (term.options.flavor === 'halfdice' && term.total) {
        stun -= term.total
        stun += Math.ceil(term.total / 2)
        body += countNormalBodyHalfDice(term)
      }
    }
  }

  return { body, stun, damageRoll: roll, type: 'normal' }
}

function countNormalBodyFullDice(term: Die) {
  let body = 0

  for (const result of term.results) {
    if (result.result === 6) {
      body += 2
    } else if (result.result > 1) {
      body += 1
    }
  }

  return body
}

function countNormalBodyHalfDice(term: Die) {
  let body = 0

  for (const result of term.results) {
    if (result.result >= 4) {
      body += 1
    }
  }

  return body
}
