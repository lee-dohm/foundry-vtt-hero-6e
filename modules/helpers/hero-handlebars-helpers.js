/**
 * Hero game system specific Handlebars helper functions.
 */
export default class HeroHandlebarsHelpers {
  /**
   * Concatenaces the string representation of two values.
   *
   * @param {*} a
   * @param {*} b
   * @returns Concatenated representation of the two values
   */
  static concat(a, b) {
    return `${a}${b}`
  }

  /**
   * Changes the supplied text to all uppercase.
   *
   * @param {*} text Text to shift to uppercase
   * @returns Uppercase version of the supplied text
   */
  static upcase(text) {
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
    Handlebars.registerHelper('upcase', this.upcase)
  }
}
