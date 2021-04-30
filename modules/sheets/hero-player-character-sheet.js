export default class HeroPlayerCharacterSheet extends ActorSheet {
  static get defaultOptions() {
    return mergeObject(super.defaultOptions, {
      template: "systems/hero6e/templates/sheets/player-character-sheet.hbs",
      classes: ["hero6e", "sheet", "player-character"]
    })
  }
}
