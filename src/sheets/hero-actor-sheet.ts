import { HERO_CONFIG } from '../config.js'
import HeroLog from '../logging.js'
import { SkillRollDialog } from '../dialogs/skill-roll-dialog.js'

declare namespace HeroActorSheet {
  /**
   * Data used to render the actor sheet.
   */
  export type Data = ActorSheet.Data<ActorSheet.Options> & {
    config: object
  }
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
   * Retrieves all of the data to be used to render the actor sheet.
   *
   * @returns Data used to render the actor sheet.
   */
  getData() {
    let data = super.getData() as HeroActorSheet.Data
    data.config = HERO_CONFIG

    HeroLog.dump(`Data supplied to ${this.options.template}`, data)

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
      const button = event.currentTarget as HTMLButtonElement

      if (!button.dataset.rollBase) {
        throw new Error('The data-roll-base attribute must be set on all rollable buttons')
      }

      if (!button.dataset.rollLabel) {
        throw new Error('The data-roll-label attribute must be set on all rollable buttons')
      }

      const dialog = await SkillRollDialog.create({
        actor: this.actor,
        base: parseInt(button.dataset.rollBase),
        label: button.dataset.rollLabel
      })

      dialog.render(true)
    }
  }
}
