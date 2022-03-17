import CharacteristicRollButton from './elements/characteristic-roll-button.js'
import { HERO_CONFIG } from '../config.js'
import HeroLog from '../logging.js'
import { SkillRollDialog } from '../dialogs/skill-roll-dialog.js'

type HeroActorSheetData = ActorSheet.Data<ActorSheet.Options> & {
  config: object
}

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
  activateListeners(html: JQuery<HTMLElement>) {
    super.activateListeners(html)

    html.find('.rollable-characteristic').on('click', (event) => this._onCharacteristicRoll(event))
  }

  /**
   * Retrieves the actor data to be displayed on the sheet.
   *
   * @returns The actor data
   */
  getData() {
    let data = super.getData() as HeroActorSheetData
    data.config = HERO_CONFIG

    HeroLog.dump('Calling HeroActorSheet.getData', data)

    return data
  }

  /**
   * Handler for a characteristic roll.
   *
   * @param event Click event for the characteristic roll button.
   */
  async _onCharacteristicRoll(event: JQuery.ClickEvent) {
    event.preventDefault()

    if (event.currentTarget) {
      const button = event.currentTarget as CharacteristicRollButton

      const d = await SkillRollDialog.create({
        actor: this.actor,
        base: button.rollBase,
        label: button.rollLabel
      })

      d.render(true)
    }
  }
}
