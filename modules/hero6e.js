import { HERO_CONFIG } from './config.js'
import * as HeroLog from './logging.js'

import HeroHandlebarsHelpers from './hero-handlebars-helpers.js'

import HeroActor from './entities/hero-actor.js'
import HeroItem from './entities/hero-item.js'

import HeroItemSheet from './sheets/hero-item-sheet.js'
import HeroActorSheet from './sheets/hero-actor-sheet.js'

/**
 * Loads all system templates.
 *
 * @returns Promise that resolves when all templates have been loaded
 */
async function loadHandlebarsTemplates() {
  const paths = [
    'systems/hero6e/templates/sheets/tabs/complications-tab.hbs',
    'systems/hero6e/templates/sheets/tabs/description-tab.hbs',
    'systems/hero6e/templates/sheets/tabs/equipment-tab.hbs',
    'systems/hero6e/templates/sheets/tabs/powers-tab.hbs',
    'systems/hero6e/templates/sheets/tabs/skills-tab.hbs'
  ]

  return loadTemplates(paths)
}

Hooks.once('init', function () {
  // Logging depends on Hero configuration
  CONFIG.HERO = HERO_CONFIG

  HeroLog.log('Initializing Hero 6th Edition game system')

  CONFIG.Actor.entityClass = HeroActor
  CONFIG.Item.entityClass = HeroItem

  Actors.unregisterSheet('core', ActorSheet)
  Actors.registerSheet('hero6e', HeroActorSheet, { makedefault: true })

  Items.unregisterSheet('core', ItemSheet)
  Items.registerSheet('hero6e', HeroItemSheet, { makedefault: true })

  HeroHandlebarsHelpers.registerHelpers()

  loadHandlebarsTemplates()
})
