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
      classes: ["hero6e", "sheet", "actor", "player"],
      tabs: [
        {
            navSelector: '.tabs',
            contentSelector: '.sheetbody',
            initial: 'skills',
        },
      ],
    })

    HeroLog.dump('Retrieving HeroActorSheet.defaultOptions', options)

    return options
  }

  /**
   * Retrieves the actor data to be displayed on the sheet.
   *
   * @returns The actor data
   */
  getData() {
    const data = super.getData()

    data.config = CONFIG.HERO

    HeroLog.dump('Calling HeroActorSheet.getData', data)

    return data
  }
}
