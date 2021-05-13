import { HERO_CONFIG } from './config.js'

import HeroHandlebarsHelpers from './hero-handlebars-helpers.js'

import HeroActor from './entities/hero-actor.js'
import HeroItem from './entities/hero-item.js'

import HeroItemSheet from './sheets/hero-item-sheet.js'
import HeroActorSheet from './sheets/hero-actor-sheet.js'

Hooks.once('init', function () {
  console.log('hero6e | Initializing Hero 6th Edition game system')

  CONFIG.HERO = HERO_CONFIG
  CONFIG.Actor.entityClass = HeroActor
  CONFIG.Item.entityClass = HeroItem

  Actors.unregisterSheet('core', ActorSheet)
  Actors.registerSheet('hero6e', HeroActorSheet, { makedefault: true })

  Items.unregisterSheet('core', ItemSheet)
  Items.registerSheet('hero6e', HeroItemSheet, { makedefault: true })

  HeroHandlebarsHelpers.registerHelpers()
})
