import { hero6e } from "./config.js"

import HeroItemSheet from "./sheets/hero-item-sheet.js"
import HeroPlayerCharacterSheet from "./sheets/hero-player-character-sheet.js"

Hooks.once("init", function () {
  console.log("hero6e | Initializing Hero 6th Edition game system")

  CONFIG.hero6e = hero6e

  Actors.unregisterSheet("core", ActorSheet)
  Actors.registerSheet("hero6e", HeroPlayerCharacterSheet, { makedefault: true })

  Items.unregisterSheet("core", ItemSheet)
  Items.registerSheet("hero6e", HeroItemSheet, { makedefault: true })
})
