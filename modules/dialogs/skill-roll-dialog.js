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
  static create(params) {
    return new Dialog({
      title: game.i18n.format('hero6e.CharacteristicCheck', { characteristic: params.label.toUpperCase() }),
      content: '<p>Some content</p>',
      buttons: {
        roll: {
          icon: fasIcon('dice'),
          label: game.i18n.localize('hero6e.Roll'),
          callback: async () => {
            let roll = new Roll('3d6', params.actor.getRollData())
            let result = await roll.evaluate({ async: true })
            let margin = params.base - result.total
            let msgId = margin >= 0 ? 'hero6e.RollSuccess' : 'hero6e.RollFail'

            result.toMessage({
              flavor: game.i18n.format(msgId, {
                description: params.label.toUpperCase(),
                margin: Math.abs(margin)
              }),
              speaker: ChatMessage.getSpeaker({ actor: params.actor })
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
  }

  /**
   * Constructs the dialog prior to rendering.
   *
   * @param {Object} dialogData Configuration options for the dialog.
   * @param {ApplicationOptions} options Dialog rendering options.
   */
  constructor(dialogData, options) {
    super(dialogData, options)
  }
}
