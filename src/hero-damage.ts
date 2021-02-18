import { HeroDamageType } from './hero-damage-type'

export interface HeroDamageResult {
  body: number
  stun: number
  type: HeroDamageType
}

export class HeroDamage {
  diceCount: number
  diceRoll?: Roll
  damageType: HeroDamageType
  result?: HeroDamageResult

  constructor(diceCount: number, damageType: HeroDamageType = HeroDamageType.NORMAL) {
    this.diceCount = diceCount
    this.damageType = damageType
  }

  roll() {
    this.diceRoll = new Roll(this._formatRoll())
    this.diceRoll.roll()
    this._calculateResult()

    if (!this.result) {
      throw new Error("CAN'T HAPPEN: Roll should have been evaluated and result calculated")
    }

    return this.result
  }

  _calculateBody() {
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

  _calculateResult() {
    if (!this.diceRoll) {
      throw new Error('Dice must be rolled before the result can be calculated')
    }

    const [full, half] = this.diceRoll.dice

    this.result = {
      body: this._calculateBody(),
      stun: full.total + Math.ceil(half.total / 2),
      type: this.damageType
    }
  }

  _formatRoll() {
    const full = Math.floor(this.diceCount)
    const half = (this.diceCount - full) === 0.5 ? true : false

    let formula = `${full}d6`

    if (half) {
      formula += ' + 1d6'
    }

    return formula
  }
}
