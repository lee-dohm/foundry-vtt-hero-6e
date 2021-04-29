import { DamageResult } from './damage-result'
import { DamageType } from './damage-type'

interface RollOptions {
  minimize?: boolean,
  maximize?: boolean
}

/**
 * A normal damage roll in the HERO game system consists of zero or more full dice and zero or one
 * "half" dice.
 *
 * A full die is a normal six-sided die. A half-die, in this case, is also a six-sided die whose
 * values are calculated differently from the full dice.
 *
 * The Stun damage from the roll is the total of the full dice plus half of the value rolled on
 * the one half die, if applicable, rounded up. The Body damage is calculated by totaling the
 * values for each die according to the following:
 *
 * * A full die that rolls a 6 counts as 2 Body
 * * A full die that rolls between 2 and 5 (inclusive) counts as 1 Body
 * * A half die that rolls a 4 or better counts as 1 Body
 * * Everything else counts as 0 Body
 *
 * See `6E2 98` for details.
 */
export class NormalDamageRoll {
  diceCount: string
  diceRoll?: Roll
  result?: DamageResult

  constructor(diceCount: string) {
    this.diceCount = diceCount
  }

  roll(options?: RollOptions): DamageResult {
    this.diceRoll = new Roll(this._formatRoll())
    this.diceRoll.evaluate(options)
    this._calculateResult()

    if (!this.result) {
      throw new Error("CAN'T HAPPEN: Roll should have been evaluated and result calculated")
    }

    return this.result
  }

  private _calculateBody(): number {
    if (!this.diceRoll) {
      throw new Error('Dice must be rolled before the result can be calculated')
    }

    const [full, half] = this.diceRoll.dice
    let body = 0

    for (let value of full.values) {
      if (value > 1 && value < 6) {
        body += 1
      } else if (value === 6) {
        body += 2
      }
    }

    if (half && half.values[0] && half.values[0] >= 4) {
      body += 1
    }

    return body
  }

  private _calculateResult() {
    if (!this.diceRoll) {
      throw new Error('Dice must be rolled before the result can be calculated')
    }

    const [full, half] = this.diceRoll.dice

    this.result = {
      body: this._calculateBody(),
      stun: full.total + (half ? Math.ceil(half.total / 2) : 0),
      type: DamageType.NORMAL
    }
  }

  private _formatRoll(): string {
    const diceCount = Number.parseFloat(this.diceCount)
    const full = Math.floor(diceCount)
    const half = (diceCount - full) === 0.5 ? true : false

    let formula = `${full}d6`

    if (half) {
      formula += ' + 1d6'
    }

    return formula
  }
}
