import { HeroMath, RoundDirection } from './math.js'

interface Adder {
  cost: number
  description: string
}

interface Advantage {
  description: string
  multiplier: string
  quarters: number
}

interface Limitation {
  description: string
  divisor: string
  quarters: number
}

namespace Power {
  export interface Params {
    name?: string
    description?: string
    baseCost?: number
    endCost?: number
    adders?: Adder[]
    advantages?: Advantage[]
    limitations?: Limitation[]
  }
}

/**
 * Describes a power.
 *
 * A power consists of:
 *
 * * `name` -- Name to be displayed when referring to the power
 * * `description` -- Full description of the power
 * * `baseCost` -- Base cost of the power in character points
 * * `endCost` -- Cost to use the power in `END`, if any
 * * `adders` -- List of adders applied to the power (see below)
 * * `advantages` -- List of advantages applied to the power (see below)
 * * `limitations` -- List of limitations applied to the power (see below)
 *
 * An adder (see **6E1 313**) adds raw character points to the point cost of a power:
 *
 * * `cost` -- Cost of the adder in character points
 * * `description` -- Description of the adder
 *
 * An advantage (see **6E1 313**) multiplies the base cost of the power after any adders
 * are applied:
 *
 * * `quarters` -- Number of 1/4ths to create the multiplier of the advantage, _ex:_ 3
 *   `quarters` would be a +3/4 advantage.
 * * `multiplier` (calculated) -- Text representation of `quarters` for display
 * * `description` -- Description of the advantage
 *
 * A limitation (see **6E1 364**) divides the active cost of the power to obtain the real
 * cost:
 *
 * * `quarters` -- Number of 1/4ths to create the divisor of the limitation, _ex:_ 5
 *   `quarters` would be a -1 1/4th limitation.
 * * `divisor` (calculated) -- Text representation of `quarters` for display
 * * `description` -- Description of the limitation
 */
export default class Power {
  private adders: Adder[]
  private advantages: Advantage[]
  private baseCost: number
  private description: string
  private endCost: number
  private limitations: Limitation[]
  private name: string

  /**
   * Formats the given number of quarters into the text representation of the
   * reduced form of the number of quarters.
   *
   * @param quarters Number of quarters to convert
   * @returns Text representation of the number of quarters given
   */
  static formatQuarters(quarters: number) {
    const wholes = Math.floor(quarters / 4)
    const remainder = quarters % 4
    let remainderText = ''

    switch (remainder) {
      case 1:
        remainderText = '¼'
        break

      case 2:
        remainderText = '½'
        break

      case 3:
        remainderText = '¾'
        break
    }

    return `${wholes}${remainderText}`
  }

  constructor(params: Power.Params) {
    this.name = params.name ?? ''
    this.description = params.description ?? ''
    this.baseCost = params.baseCost ?? 1
    this.endCost = params.endCost ?? 0
    this.adders = params.adders ?? []
    this.advantages = params.advantages ?? []
    this.limitations = params.limitations ?? []
  }

  /**
   * The active cost of the power.
   *
   * The active cost is the base cost plus all adders and advantages. Also used as the
   * basis for a number of other things like the effect of **Drain** or calculating the
   * base `endCost`.
   *
   * The minimum active cost is 1.
   */
  get activeCost() {
    let cost = this.baseCost

    for (const adder of this.adders) {
      cost += adder.cost
    }

    let advantageQuarters = 4
    for (const advantage of this.advantages) {
      advantageQuarters += advantage.quarters
    }

    cost = HeroMath.round(cost * (advantageQuarters / 4), RoundDirection.Down)

    return cost < 1 ? 1 : cost
  }

  /**
   * The real cost of the power.
   *
   * The real cost is the active cost minus all limitations.
   *
   * The minimum real cost is 1.
   */
  get realCost() {
    let cost = this.activeCost

    let limitationQuarters = 4
    for (const limitation of this.limitations) {
      limitationQuarters += limitation.quarters
    }

    cost = HeroMath.round(cost / (limitationQuarters / 4), RoundDirection.Down)

    return cost < 1 ? 1 : cost
  }
}
