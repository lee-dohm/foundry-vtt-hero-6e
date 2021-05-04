export default class HeroActor extends Actor {
  prepareDerivedData() {
    this._calculateCharacteristicRolls()
  }

  get _actorData() {
    return this.data
  }

  get _actorGameData() {
    return this.data.data
  }

  _calculateCharacteristicRolls() {
    for (const charName of Object.keys(this._actorGameData.characteristics)) {
      if (Object.keys(CONFIG.hero6e.skillRollCharacteristics).includes(charName)) {
        const characteristic = this._actorGameData.characteristics[charName]

        characteristic.roll = 9 + Math.round(characteristic.value / 5)
      }
    }
  }
}
