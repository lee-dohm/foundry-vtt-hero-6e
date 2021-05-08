const DAMAGE_PATTERN = /^(?<full>\d+)?(?<half>\.5|½)?d6(?<mod>(\+|-)1)?$/i

/**
 * Raised when an invalid damage formula is given to a roll damage function.
 *
 * See **6E2 97** for a representative list of valid damage formulas.
 */
export class InvalidDamageFormulaError extends Error {
  constructor(formula) {
    const message = `Invalid damage formula: ${formula}`
    super(message)
    this.name = "InvalidDamageFormulaError"
  }
}

/**
 * Rolls and calculates the amount of `STUN` and `BODY` damage indicated by the dice.
 *
 * @param {string} formula Normal damage dice formula, ex: `3d6`, `6.5d6`, or `4½d6+1`
 * @returns {HeroDamage} An object describing the amount of `STUN`, `BODY`, and type of damage.
 */
export function rollNormalDamage(formula) {
  const match = formula.match(DAMAGE_PATTERN)

  if (!match) {
    throw new InvalidDamageFormulaError(formula)
  }

  const damageFormula = buildDamageFormula(match.groups)
  const damageRoll = new Roll(damageFormula)
  damageRoll.evaluate()

  return calculateNormalDamage(damageRoll)
}

function buildDamageFormula({full, half, mod}) {
  const fullDice = `${full}d6[full dice]`
  const halfDice = half ? '1d6[half dice]' : ''

  return `${fullDice}${halfDice}${mod}`
}

function calculateNormalDamage(roll) {
  let stun = 0
  let body = 0

  for (const term of roll.terms) {
    if (term instanceof Die) {
      if (term.options.flavor === "fulldice") {
        stun += term.total
        body += countNormalBodyFullDice(term)
      } else if (term.options.flavor === "halfdice") {
        stun += Math.ceil(term.total / 2)
        body += countNormalBodyHalfDice(term)
      }
    }
  }

  return { body, stun, roll, type: "NORMAL" }
}

function countNormalBodyFullDice(term) {
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

function countNormalBodyHalfDice(term) {
  let body = 0

  for (const result of term.results) {
    if (result.result >= 4) {
      body += 1
    }
  }

  return body
}
