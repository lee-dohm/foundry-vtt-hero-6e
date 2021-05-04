import { hero6e } from "./config.js"

import HeroActor from "./hero-actor.js"

import HeroHandlebarsHelpers from "./hero-handlebars-helpers.js"

import HeroItemSheet from "./sheets/hero-item-sheet.js"
import HeroActorSheet from "./sheets/hero-actor-sheet.js"

Hooks.once("init", function () {
  console.log("hero6e | Initializing Hero 6th Edition game system")

  CONFIG.hero6e = hero6e
  CONFIG.Actor.entityClass = HeroActor

  Actors.unregisterSheet("core", ActorSheet)
  Actors.registerSheet("hero6e", HeroActorSheet, { makedefault: true })

  Items.unregisterSheet("core", ItemSheet)
  Items.registerSheet("hero6e", HeroItemSheet, { makedefault: true })

  HeroHandlebarsHelpers.registerHelpers()
})
