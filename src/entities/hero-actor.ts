import { HeroMath, RoundDirection } from '../math.js'
import { HeroItem } from './hero-item.js'

interface Characteristic {
  value: number
}

interface Resource {
  value: number
  max: number
}

interface RollableCharacteristic extends Characteristic {
  roll: number
}

interface CharacteristicsSource {
  str: Characteristic
  dex: Characteristic
  con: Characteristic
  int: Characteristic
  ego: Characteristic
  pre: Characteristic
  ocv: Characteristic
  dcv: Characteristic
  omcv: Characteristic
  dmcv: Characteristic
  spd: Characteristic
  pd: Characteristic
  ed: Characteristic
  rec: Characteristic
  end: Resource
  body: Resource
  stun: Resource
}

interface CharacteristicsProperties {
  str: RollableCharacteristic
  dex: RollableCharacteristic
  con: RollableCharacteristic
  int: RollableCharacteristic
  ego: RollableCharacteristic
  pre: RollableCharacteristic
  ocv: Characteristic
  dcv: Characteristic
  omcv: Characteristic
  dmcv: Characteristic
  spd: Characteristic
  pd: Characteristic
  ed: Characteristic
  rec: Characteristic
  end: Resource
  body: Resource
  stun: Resource
}

interface Movement {
  run: Characteristic
  swim: Characteristic
  leap: Characteristic
}

interface CharacterDataSourceData {
  characteristics: CharacteristicsSource
  movement: Movement
}

interface CharacterDataPropertiesData {
  characteristics: CharacteristicsProperties
  movement: Movement
  complications: HeroItem[]
  equipment: HeroItem[]
  powers: HeroItem[]
  skills: HeroItem[]
}

interface CharacterDataSource {
  type: 'character'
  data: CharacterDataSourceData
}

interface CharacterDataProperties {
  type: 'character'
  data: CharacterDataPropertiesData
}

export type HeroActorDataSource = CharacterDataSource
export type HeroActorDataProperties = CharacterDataProperties

export class HeroActor extends Actor {
  /**
   * @override
   */
  prepareData() {
    super.prepareData()

    this._calculateCharacteristicRolls()
    this._prepItemDataCollections()
  }

  get _actorData() {
    return this.data
  }

  get _actorGameData() {
    return this.data.data
  }

  protected _calculateCharacteristicRoll(value: number): number {
    return 9 + HeroMath.round(value / 5, RoundDirection.Up)
  }

  protected _calculateCharacteristicRolls() {
    const characteristics = this._actorGameData.characteristics

    characteristics.str.roll = this._calculateCharacteristicRoll(characteristics.str.value)
    characteristics.dex.roll = this._calculateCharacteristicRoll(characteristics.dex.value)
    characteristics.con.roll = this._calculateCharacteristicRoll(characteristics.con.value)
    characteristics.int.roll = this._calculateCharacteristicRoll(characteristics.int.value)
    characteristics.ego.roll = this._calculateCharacteristicRoll(characteristics.ego.value)
    characteristics.pre.roll = this._calculateCharacteristicRoll(characteristics.pre.value)
  }

  protected _prepItemDataCollections() {
    // this._actorGameData.complications = this.itemTypes.complication
    // this._actorGameData.equipment = this.itemTypes.equipment
    // this._actorGameData.powers = this.itemTypes.power
    this._actorGameData.skills = this.itemTypes.skill
  }
}
