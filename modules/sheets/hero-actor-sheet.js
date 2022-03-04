import * as HeroLog from '../logging.js'
import { fasIcon } from '../helpers/icon-helpers.js'
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

    let d = new SkillRollDialog({
      title: game.i18n.format('hero6e.CharacteristicCheck', { characteristic: rollLabel.toUpperCase() }),
      content: '<p>Some content</p>',
      buttons: {
        roll: {
          icon: fasIcon('dice'),
          label: game.i18n.localize('hero6e.Roll'),
          callback: async () => {
            let roll = new Roll('3d6', this.actor.getRollData())
            let result = await roll.evaluate({ async: true })
            let margin = rollBase - result.total
            let msgId = margin >= 0 ? 'hero6e.RollSuccess' : 'hero6e.RollFail'

            result.toMessage({
              flavor: game.i18n.format(msgId, {
                description: rollLabel.toUpperCase(),
                margin: Math.abs(margin)
              }),
              speaker: ChatMessage.getSpeaker({ actor: this.actor })
            })
          }
        },
        cancel: {
          icon: fasIcon('times'),
          label: game.i18n.localize('hero6e.Cancel')
        }
      },
      default: 'roll'
    })

    d.render(true)
  }
}
