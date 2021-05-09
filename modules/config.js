import { rollKillingDamage, rollNormalDamage } from './damage.js'

export const hero6e = {}

hero6e.damage = {
  rollNormal: rollNormalDamage,
  rollKilling: rollKillingDamage,
  stunMultFormula: '1d3'
}

hero6e.skillRollCharacteristics = {
  str: 'STR',
  dex: 'DEX',
  con: 'CON',
  int: 'INT',
  ego: 'EGO',
  pre: 'PRE'
}

hero6e.skillRollTypes = {
  characteristic: 'hero6e.skill.rollTypes.characteristic',
  none: 'hero6e.skill.rollTypes.none',
  raw: 'hero6e.skill.rollTypes.raw'
}
