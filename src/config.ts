export const HERO_CONFIG = {
  damage: {
    // Dice formula for determining the STUN-multiplier on a Killing attack
    stunMultFormula: '1d3'
  },

  // List of characteristics used for basic skill rolls
  skillRollCharacteristics: {
    str: 'hero6e.characteristic.names.str',
    dex: 'hero6e.characteristic.names.dex',
    con: 'hero6e.characteristic.names.con',
    int: 'hero6e.characteristic.names.int',
    ego: 'hero6e.characteristic.names.ego',
    pre: 'hero6e.characteristic.names.pre'
  },

  // List of types of skill rolls
  skillRollTypes: {
    // Skills with rolls based on a characteristic
    characteristic: 'hero6e.skill.rollTypes.characteristic',

    // Skills that do not have a skill roll associated
    none: 'hero6e.skill.rollTypes.none',

    // Skills whose roll is a raw number
    raw: 'hero6e.skill.rollTypes.raw'
  },

  system: {
    longName: 'HERO System 6th Edition',
    shortName: 'Hero6E'
  }
}
