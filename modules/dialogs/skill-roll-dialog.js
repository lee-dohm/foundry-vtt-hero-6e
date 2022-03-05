import * as HeroLog from '../logging.js'

import { fasIcon } from '../helpers/icon-helpers.js'

/**
 * A dialog for performing a standard skill or characteristic roll.
 */
export class SkillRollDialog extends Dialog {
  /**
   * Creates the skill roll dialog to be rendered.
   *
   * @param {SkillRollDialogParams} params Parameters for the skill roll dialog
   * @returns Dialog instance to render
   */
  static async create(params) {
    if (typeof params.base !== 'number') {
      params.base = parseInt(params.base, 10)
    }

    return new SkillRollDialog({
      title: game.i18n.format('hero6e.CharacteristicCheck', {
        characteristic: params.label.toUpperCase()
      }),
      content: await renderTemplate('systems/hero6e/templates/dialogs/skill-roll-dialog.hbs'),
      buttons: {
        roll: {
          icon: fasIcon('dice'),
          label: game.i18n.localize('hero6e.Roll')
        },
        cancel: {
          icon: fasIcon('times'),
          label: game.i18n.localize('hero6e.Cancel')
        }
      },
      default: 'roll',
      params: params
    })
  }

  /**
   * Constructs the dialog prior to rendering.
   *
   * @param {Object} dialogData Configuration options for the dialog.
   * @param {ApplicationOptions} options Dialog rendering options.
   */
  constructor(dialogData, options) {
    super(dialogData, options)

    this._actor = dialogData.params.actor
    this._base = dialogData.params.base
    this._label = dialogData.params.label
  }

  get modifierInput() {
    const input = this._element.find('.modifier-input')[0]

    return input
  }

  get modifier() {
    return parseInt(this.modifierInput.value, 10)
  }

  /**
   * After rendering, activates the event listeners for the dialog.
   *
   * @param {jQuery} html Reference to the dialog within the UI
   */
  activateListeners(html) {
    super.activateListeners(html)

    html.find('.cancel.dialog-button').click(this.close.bind(this))
    html.find('.roll.dialog-button').click(this._roll.bind(this))
    html.find('.modifier-button-minus').click(this._decrementModifier.bind(this))
    html.find('.modifier-button-plus').click(this._incrementModifier.bind(this))
  }

  _decrementModifier(event) {
    event.preventDefault()

    this.modifierInput.value = this.modifier - 1
  }

  _incrementModifier(event) {
    event.preventDefault()

    this.modifierInput.value = this.modifier + 1
  }

  /**
   * Rolls the dice based on the current values in the dialog and closes it.
   *
   * @param {Event} event Event being handled
   */
  async _roll(event) {
    event.preventDefault()

    let roll = new Roll('3d6', this._actor.getRollData())
    let result = await roll.evaluate({ async: true })
    let margin = this._base + this.modifier - result.total
    let msgId = margin >= 0 ? 'hero6e.RollSuccess' : 'hero6e.RollFail'

    result.toMessage({
      flavor: game.i18n.format(msgId, {
        description: this._label.toUpperCase(),
        margin: Math.abs(margin)
      }),
      speaker: ChatMessage.getSpeaker({ actor: this._actor })
    })

    this.close()
  }
}
