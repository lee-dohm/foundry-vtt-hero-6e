import { HERO_CONFIG } from '../config.js'
import HeroLog from '../logging.js'

type HeroItemSheetData = ItemSheet.Data<ItemSheet.Options> & {
  config: object
}

/**
 * Base item sheet for the Hero game system.
 */
export default class HeroItemSheet extends ItemSheet {
  /**
   * Default options for Hero item sheets.
   */
  static get defaultOptions() {
    return mergeObject(super.defaultOptions, {
      classes: ['hero6e', 'sheet', 'item']
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
    let data = super.getData() as HeroItemSheetData
    data.config = HERO_CONFIG

    HeroLog.dump('Calling HeroItemSheet.getData', data)

    return data
  }
}
