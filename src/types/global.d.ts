import { HeroActor, HeroActorDataProperties, HeroActorDataSource } from '../entities/hero-actor.js'
import { HeroItem, HeroItemDataProperties, HeroItemDataSource } from '../entities/hero-item.js'

declare global {
  interface SourceConfig {
    Actor: HeroActorDataSource
    Item: HeroItemDataSource
  }

  interface DataConfig {
    Actor: HeroActorDataProperties
    Item: HeroItemDataProperties
  }

  interface DocumentClassConfig {
    Actor: typeof HeroActor
    Item: typeof HeroItem
  }
}
