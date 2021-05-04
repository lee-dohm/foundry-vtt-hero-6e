/**
 * Base actor sheet for the Hero game system.
 */
export default class HeroActorSheet extends ActorSheet {
  /**
   * Default options for Hero actor sheets.
   */
  static get defaultOptions() {
    return mergeObject(super.defaultOptions, {
      template: "systems/hero6e/templates/sheets/player-sheet.hbs",
      classes: ["hero6e", "sheet", "actor", "player"]
    })
  }

  /**
   * Retrieves the actor data to be displayed on the sheet.
   *
   * @returns The actor data
   */
  getData() {
    const data = super.getData()

    data.config = CONFIG.hero6e

    return data
  }
}
