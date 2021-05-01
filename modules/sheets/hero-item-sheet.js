export default class HeroItemSheet extends ItemSheet {
  static get defaultOptions() {
    return mergeObject(super.defaultOptions, {
      classes: ["hero6e", "sheet", "item"],
      height: 340
    })
  }

  get template() {
    return `systems/hero6e/templates/sheets/${this.item.type}-sheet.hbs`
  }

  getData() {
    const data = super.getData()

    data.config = CONFIG.hero6e

    return data
  }
}
