import { HeroMath, RoundDirection } from '../math.js';
export class HeroActor extends Actor {
    /**
     * @override
     */
    prepareData() {
        super.prepareData();
        this._calculateCharacteristicRolls();
        this._prepItemDataCollections();
    }
    get _actorData() {
        return this.data;
    }
    get _actorGameData() {
        return this.data.data;
    }
    _calculateCharacteristicRoll(value) {
        return 9 + HeroMath.round(value / 5, RoundDirection.Up);
    }
    _calculateCharacteristicRolls() {
        const characteristics = this._actorGameData.characteristics;
        characteristics.str.roll = this._calculateCharacteristicRoll(characteristics.str.value);
        characteristics.dex.roll = this._calculateCharacteristicRoll(characteristics.dex.value);
        characteristics.con.roll = this._calculateCharacteristicRoll(characteristics.con.value);
        characteristics.int.roll = this._calculateCharacteristicRoll(characteristics.int.value);
        characteristics.ego.roll = this._calculateCharacteristicRoll(characteristics.ego.value);
        characteristics.pre.roll = this._calculateCharacteristicRoll(characteristics.pre.value);
    }
    _prepItemDataCollections() {
        // this._actorGameData.complications = this.itemTypes.complication
        // this._actorGameData.equipment = this.itemTypes.equipment
        // this._actorGameData.powers = this.itemTypes.power
        this._actorGameData.skills = this.itemTypes.skill;
    }
}
//# sourceMappingURL=hero-actor.js.map