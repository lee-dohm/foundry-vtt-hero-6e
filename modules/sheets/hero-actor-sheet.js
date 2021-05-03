export default class HeroActorSheet extends ActorSheet {
  static get defaultOptions() {
    return mergeObject(super.defaultOptions, {
      template: "systems/hero6e/templates/sheets/player-sheet.hbs",
      classes: ["hero6e", "sheet", "player"]
    })
  }

  getData() {
    const data = super.getData()

    data.config = CONFIG.hero6e

    return data
  }
}
