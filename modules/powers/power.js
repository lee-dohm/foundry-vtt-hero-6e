/**
 * Describes a power.
 */
export default class Power {
  constructor({name, description, baseCost, endCost, adders, advantages, limitations}) {
    this.name = name ?? ""
    this.description = description ?? ""
    this.baseCost = baseCost ?? 0
    this.endCost = endCost ?? 0
    this.adders = adders ?? []
    this.advantages = advantages ?? []
    this.limitations = limitations ?? []
  }

  /**
   * The active cost of the power.
   *
   * The active cost is the base cost plus all adders and advantages.
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

    cost = Math.round(cost * (advantageQuarters / 4))

    return cost
  }

  /**
   * The real cost of the power.
   *
   * The real cost is the active cost minus all limitations.
   */
  get realCost() {
    let cost = this.activeCost

    let limitationQuarters = 4
    for (const limitation of this.limitations) {
      limitationQuarters += limitation.quarters
    }

    cost = Math.round(cost / (limitationQuarters / 4))

    return cost
  }
}
