import * as HeroMath from '../math.js'

/**
 * Hero game system Actor logic.
 */
export default class HeroActor extends Actor {
  /**
   * Apply final transformations to the Actor data after all effects have been
   * applied.
   *
   * @override
   */
  prepareDerivedData() {
    super.prepareDerivedData()

    this._calculateCharacteristicRolls()
    this._prepItemDataCollections()
  }

  get _actorData() {
    return this.data
  }

  get _actorGameData() {
    return this.data.data
  }

  _calculateCharacteristicRolls() {
    for (const charName of Object.keys(this._actorGameData.characteristics)) {
      if (Object.keys(CONFIG.HERO.skillRollCharacteristics).includes(charName)) {
        const characteristic = this._actorGameData.characteristics[charName]

        characteristic.roll = 9 + HeroMath.round(characteristic.value / 5, "up")
      }
    }
  }

  _prepItemDataCollections() {
    this._actorGameData.complications = this.itemTypes.complication
    this._actorGameData.equipment = this.itemTypes.equipment
    this._actorGameData.powers = this.itemTypes.power
    this._actorGameData.skills = this.itemTypes.skill
  }
}
