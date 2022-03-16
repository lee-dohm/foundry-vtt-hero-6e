import * as HeroLog from '../logging.js'
import { SkillRollDialog } from '../dialogs/skill-roll-dialog.js'
/**
 * Base actor sheet for the Hero game system.
 */
export default class HeroActorSheet extends ActorSheet {
  /**
   * Default options for Hero actor sheets.
   */
  static get defaultOptions() {
    const options = mergeObject(super.defaultOptions, {
      baseApplication: 'HeroActorSheet',
      template: 'systems/hero6e/templates/sheets/character-sheet.hbs',
      classes: ['hero6e', 'sheet', 'actor', 'character'],
      tabs: [
        {
          navSelector: '.tabs.list-navigation',
          contentSelector: '.list-display',
          initial: 'skills'
        }
      ]
    })
    HeroLog.dump('Retrieving HeroActorSheet.defaultOptions', options)
    return options
  }
  /**
   * Activates listeners for events relevant to the actor sheet.
   *
   * @param html HTML fragment within which to activate listeners
   */
  activateListeners(html) {
    super.activateListeners(html)
    html.find('.rollable-characteristic').on('click', (event) => this._onCharacteristicRoll(event))
  }
  /**
   * Retrieves the actor data to be displayed on the sheet.
   *
   * @returns The actor data
   */
  getData() {
    const data = super.getData()
    HeroLog.dump('Calling HeroActorSheet.getData', data)
    return data
  }
  async _onCharacteristicRoll(event) {
    event.preventDefault()
    if (event && event.currentTarget) {
      const target = event.currentTarget
      const dataset = target.dataset
      const { rollBase, rollLabel } = dataset
      if (!rollBase || !rollLabel) {
        throw new Error(
          `Both 'data-roll-base' and 'data-roll-label' have to be set on characteristic roll elements`
        )
      }
      const d = await SkillRollDialog.create({
        actor: this.actor,
        base: parseInt(rollBase),
        label: rollLabel
      })
      d.render(true)
    }
  }
}
//# sourceMappingURL=hero-actor-sheet.js.map
