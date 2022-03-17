import { fasIcon } from './icon-helpers.js'

/**
 * Hero game system specific Handlebars helper functions.
 */
export default class HeroHandlebarsHelpers {
  /**
   * Concatenaces the string representation of two values.
   */
  static concat(a: any, b: any) {
    return `${a}${b}`
  }

  /**
   * Emits HTML to render a FontAwesome icon.
   *
   * @param name Name of the FontAwesome icon to render
   * @returns HTML to render the named icon
   */
  static icon(name: string) {
    return new Handlebars.SafeString(fasIcon(name))
  }

  /**
   * Changes the supplied text to all uppercase.
   *
   * @param text Text to shift to uppercase
   * @returns Uppercase version of the supplied text
   */
  static upcase(text: string) {
    return text.toUpperCase()
  }

  /**
   * Loads all system templates.
   *
   * @returns Promise that resolves when all templates have been loaded
   */
  static async preloadTemplates() {
    const paths = [
      'systems/hero6e/templates/sheets/tabs/complications-tab.hbs',
      'systems/hero6e/templates/sheets/tabs/description-tab.hbs',
      'systems/hero6e/templates/sheets/tabs/equipment-tab.hbs',
      'systems/hero6e/templates/sheets/tabs/powers-tab.hbs',
      'systems/hero6e/templates/sheets/tabs/skills-tab.hbs'
    ]

    return loadTemplates(paths)
  }

  /**
   * Registers all of the Handlebars helper functions.
   */
  static registerHelpers() {
    Handlebars.registerHelper('concat', this.concat)
    Handlebars.registerHelper('icon', this.icon)
    Handlebars.registerHelper('upcase', this.upcase)
  }
}
