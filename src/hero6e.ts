import HeroLog from './logging.js'

import HeroHandlebarsHelpers from './helpers/hero-handlebars-helpers.js'

import { HeroActor } from './entities/hero-actor.js'
import { HeroItem } from './entities/hero-item.js'

import HeroActorSheet from './sheets/hero-actor-sheet.js'
import HeroItemSheet from './sheets/hero-item-sheet.js'

Hooks.once('init', function () {
  HeroLog.log('Initializing Hero 6th Edition game system')

  CONFIG.Actor.documentClass = HeroActor
  CONFIG.Item.documentClass = HeroItem

  Actors.unregisterSheet('core', ActorSheet)
  Actors.registerSheet('hero6e', HeroActorSheet, { makeDefault: true })

  Items.unregisterSheet('core', ItemSheet)
  Items.registerSheet('hero6e', HeroItemSheet, { makeDefault: true })

  HeroHandlebarsHelpers.registerHelpers()
  HeroHandlebarsHelpers.preloadTemplates()
})
