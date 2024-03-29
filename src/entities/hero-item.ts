enum SkillCharacteristic {
  STR = 'str',
  INT = 'int',
  CON = 'con',
  DEX = 'dex',
  EGO = 'ego',
  PRE = 'pre'
}

interface CharacteristicSkillRoll {
  type: 'characteristic'
  characteristic: SkillCharacteristic
  bonus: number
}

interface CharacteristicSkillRollProperties {
  type: 'characteristic'
  characteristic: SkillCharacteristic
  bonus: number
  value: number
}

interface RawSkillRoll {
  type: 'raw'
  bonus: number
  value: number
}

interface NoSkillRoll {
  type: 'none'
}

type SkillRoll = CharacteristicSkillRoll | NoSkillRoll | RawSkillRoll
type SkillRollProperties = CharacteristicSkillRollProperties | NoSkillRoll | RawSkillRoll

interface SkillDataSourceData {
  description: string
  points: number
  roll: SkillRoll
  skillType: string
  source: string
}

interface SkillDataPropertiesData {
  description: string
  points: number
  roll: SkillRollProperties
  skillType: string
  source: string
}

interface SkillDataSource {
  type: 'skill'
  data: SkillDataSourceData
}

interface SkillDataProperties {
  type: 'skill'
  data: SkillDataPropertiesData
}

export type HeroItemDataSource = SkillDataSource
export type HeroItemDataProperties = SkillDataProperties

export class HeroItem extends Item {
  get itemData() {
    return this.data
  }

  get itemGameData() {
    return this.data.data
  }
}
