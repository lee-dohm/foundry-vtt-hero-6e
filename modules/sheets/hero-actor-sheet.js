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

    let d = new SkillRollDialog({
      title: 'Test Dialog',
      content: '<p>Some content</p>',
      buttons: {
        one: {
          icon: '<i class="fas fa-check"></i>',
          label: "Option One",
          callback: () => console.log("Chose One")
        },
        two: {
          icon: '<i class="fas fa-times"></i>',
          label: "Option Two",
          callback: () => console.log("Chose Two")
        }
      },
      default: "two",
      render: () => console.log("Register interactivity in the rendered dialog"),
      close: async () => {
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
    })

    d.render(true)
  }
}
