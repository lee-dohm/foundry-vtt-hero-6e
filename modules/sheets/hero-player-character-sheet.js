export default class HeroPlayerCharacterSheet extends ActorSheet {
  static get defaultOptions() {
    return mergeObject(super.defaultOptions, {
      template: "systems/hero6e/templates/sheets/player-character-sheet.hbs",
      classes: ["hero6e", "sheet", "player-character"]
    })
  }

  getData() {
    const data = super.getData()

    data.config = CONFIG.hero6e

    // data.primaryCharacteristics = data.characteristics.filter(c => c.category === "primary")
    // data.secondaryCharacteristics = data.characteristics.filter(c => c.category === "secondary")

    return data
  }
}
