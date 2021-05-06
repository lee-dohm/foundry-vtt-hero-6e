/**
 * Describes some kind of roll or check in the Hero system.
 */
interface HeroRoll {
  /** Type of the roll */
  type: "characteristic" | "none" | "raw"
}

/**
 * Describes a characteristic-based roll.
 *
 * Characteristic rolls in Hero have a base value of `9 + (CHA / 5)` before
 * modifiers. Often skills are purchased with an added `bonus` on top of the
 * base value.
 */
interface CharacteristicRoll extends HeroRoll {
  type: "characteristic"

  /** Which characteristic to use to determine the base roll. */
  characteristic: "str" | "dex" | "con" | "int" | "ego" | "pre"

  /** Any purchased bonus to the roll. */
  bonus: number
}

/**
 * Represents not having a roll.
 */
interface NoRoll extends HeroRoll {
  type: "none"
}

/**
 * Describes a roll that uses a raw number as the base.
 */
interface RawRoll extends HeroRoll {
  type: "raw"

  /** Base roll number. */
  base: number

  /** Any purchased bonus to the roll. */
  bonus: number
}

/**
 * Data describing a skill.
 */
interface SkillData {
  /** Description of the skill. */
  description: string,

  /** Display name of the skill. */
  name: string,

  /** The points cost of the skill. */
  points: number,

  /** Method of calculating the skill roll, if any. */
  roll: HeroRoll
}

/**
 * Data contained in a skill item.
 */
interface SkillItemData extends Item.Data<SkillData> {
  type: "skill"
}

export type HeroItemData = SkillItemData
