/**
 * Base item sheet for the Hero game system.
 */
export default class HeroItemSheet extends ItemSheet {
  /**
   * Default options for Hero item sheets.
   */
  static get defaultOptions() {
    return mergeObject(super.defaultOptions, {
      classes: ["hero6e", "sheet", "item"]
    })
  }

  /**
   * Template to use when rendering the item sheet.
   */
  get template() {
    return `systems/hero6e/templates/sheets/${this.item.type}-sheet.hbs`
  }

  /**
   * Retrieves the item data to be displayed on the sheet.
   *
   * @returns The item data
   */
  getData() {
    const data = super.getData()

    data.config = CONFIG.hero6e

    return data
  }
}
