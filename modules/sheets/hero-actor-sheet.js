import * as HeroLog from '../logging.js'

/**
 * Base actor sheet for the Hero game system.
 */
export default class HeroActorSheet extends ActorSheet {
  /**
   * Default options for Hero actor sheets.
   */
  static get defaultOptions() {
    const options = mergeObject(super.defaultOptions, {
      baseApplication: "HeroActorSheet",
      template: "systems/hero6e/templates/sheets/player-sheet.hbs",
      classes: ["hero6e", "sheet", "actor", "player"]
    })

    HeroLog.dump('Retrieving HeroActorSheet.defaultOptions', options)

    return options
  }

  /**
   * Reference to the actor object.
   */
  get actor() {
    const actor = super.actor

    HeroLog.dump('Retrieving HeroActorSheet.actor', actor)

    return actor
  }

  /**
   * Retrieves the actor data to be displayed on the sheet.
   *
   * @returns The actor data
   */
  getData() {
    const data = super.getData()

    data.config = CONFIG.HERO

    return data
  }
}
