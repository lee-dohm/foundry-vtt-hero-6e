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
   * @param {*} html HTML fragment within which to activate listeners
   */
  activateListeners(html) {
    super.activateListeners(html)

    html.find('.rollable-characteristic').click(this._onCharacteristicRoll.bind(this))
  }

  /**
   * Retrieves the actor data to be displayed on the sheet.
   *
   * @returns The actor data
   */
  getData() {
    const data = super.getData()

    data.config = CONFIG.HERO

    HeroLog.dump('Calling HeroActorSheet.getData', data)

    return data
  }

  async _onCharacteristicRoll(event) {
    event.preventDefault()

    const dataset = event.currentTarget.dataset
    const { rollBase, rollLabel } = dataset
    const d = await SkillRollDialog.create({ actor: this.actor, base: rollBase, label: rollLabel })

    d.render(true)
  }
}
