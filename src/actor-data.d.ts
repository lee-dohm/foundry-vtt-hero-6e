import { HeroConfig } from './config.js'
import { HeroItemData } from './item-data'
import HeroItem from './entities/hero-item.js'

interface Characteristic {
  value: number
  roll?: number
}

interface CharacteristicResource extends Characteristic {
  max: number
}

interface Movement {
  value: number
}

interface CreatureData {
  characteristics: Record<string, Characteristic>
  movement: Record<string, Movement>
  skills: HeroItem[]
  complications: HeroItem[]
  equipment: HeroItem[]
  powers: HeroItem[]
  data?: HeroConfig
}

interface PlayerActorData extends Actor.Data<CreatureData, HeroItemData> {
  type: "player"
}

interface NpcActorData extends Actor.Data<CreatureData, HeroItemData> {
  type: "npc"
}

export type HeroActorData = PlayerActorData | NpcActorData
