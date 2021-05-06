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
   * Registers all of the Handlebars helper functions.
   */
  static registerHelpers() {
    Handlebars.registerHelper('concat', this.concat)
  }
}
