import { HERO_CONFIG } from '../config.js'
import HeroLog from '../logging.js'
import Path from '../path.js'

declare namespace HeroItemSheet {
  export type Data = ItemSheet.Data<ItemSheet.Options> & {
    config: object
  }
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
    return Path.join(this.getTemplateDir(), this.getTemplateName())
  }

  /**
   * Retrieves the item data to be displayed on the sheet.
   *
   * @returns The item data
   */
  getData() {
    let data = super.getData() as HeroItemSheet.Data
    data.config = HERO_CONFIG

    HeroLog.dump(`Data supplied to ${this.template}`, data)

    return data
  }

  protected getTemplateDir() {
    return 'systems/hero6e/templates/sheets'
  }

  protected getTemplateName() {
    return `${this.item.type}-sheet.hbs`
  }
}
