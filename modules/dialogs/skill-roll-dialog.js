import { getGame } from '../helpers/global-helpers.js';
import { fasIcon } from '../helpers/icon-helpers.js';
/**
 * A dialog for performing a standard skill or characteristic roll.
 */
export class SkillRollDialog extends Dialog {
    /**
     * Constructs the dialog prior to rendering.
     *
     * @param dialogData Configuration options for the dialog.
     * @param options Dialog rendering options.
     */
    constructor(dialogData, options) {
        super(dialogData, options);
        this._actor = dialogData.params.actor;
        this._base = dialogData.params.base;
        this._label = dialogData.params.label;
    }
    /**
     * Creates the skill roll dialog to be rendered.
     *
     * @param params Parameters for the skill roll dialog
     * @returns Dialog instance to render
     */
    static async create(params) {
        if (typeof params.base !== 'number') {
            params.base = parseInt(params.base, 10);
        }
        return new SkillRollDialog({
            title: getGame().i18n.format('hero6e.CharacteristicCheck', {
                characteristic: params.label.toUpperCase()
            }),
            content: await renderTemplate('systems/hero6e/templates/dialogs/skill-roll-dialog.hbs', {}),
            buttons: {
                roll: {
                    icon: fasIcon('dice'),
                    label: getGame().i18n.localize('hero6e.Roll')
                },
                cancel: {
                    icon: fasIcon('times'),
                    label: getGame().i18n.localize('hero6e.Cancel')
                }
            },
            default: 'roll',
            params: params
        });
    }
    /**
     * Gets the modifier input element.
     */
    get modifierInput() {
        if (!this._modifierInput) {
            this._modifierInput = this.element.find('input[name="modifier"]')[0];
        }
        return this._modifierInput;
    }
    /**
     * Gets the numeric modifier value from the modifier input element.
     */
    get modifier() {
        return parseInt(this.modifierInput.value, 10);
    }
    /**
     * Sets the modifier input element to the given value.
     */
    set modifier(value) {
        this.modifierInput.value = this._formatModifier(value);
    }
    /**
     * After rendering, activates the event listeners for the dialog.
     *
     * @param html Reference to the dialog within the UI
     */
    activateListeners(html) {
        super.activateListeners(html);
        html.find('.cancel.dialog-button').on('click', () => this.close());
        html.find('.roll.dialog-button').on('click', this._roll.bind(this));
        html.find('.modifier-minus').on('click', this._decrementModifier.bind(this));
        html.find('.modifier-plus').on('click', this._incrementModifier.bind(this));
    }
    /**
     * Decrement the modifier in response to the minus button being pressed.
     *
     * @param event Event that triggered the decrement
     */
    _decrementModifier(event) {
        event.preventDefault();
        this.modifier = this.modifier - 1;
    }
    /**
     * Formats the numeric form of the modifier into its text representation.
     *
     * @param modifier Numeric form of the modifier
     * @returns Text form of the modifier
     */
    _formatModifier(modifier) {
        if (modifier > 0) {
            return `+${modifier}`.toString();
        }
        return modifier.toString();
    }
    /**
     * Gets the appropriate flavor text localization message ID to use based on
     * various factors.
     *
     * @param total Total rolled on the dice
     * @param margin Margin between the target and the total
     * @param modifier Modifier set for the roll
     * @returns Message ID to use for the flavor text on the chat message
     */
    _getMessageId(total, margin, modifier) {
        if (total === 3) {
            return 'hero6e.RollAutomaticSuccess';
        }
        if (total === 18) {
            return 'hero6e.RollAutomaticFail';
        }
        if (modifier === 0) {
            if (margin > 0) {
                return 'hero6e.RollSuccess';
            }
            else if (margin === 0) {
                return 'hero6e.RollExactSuccess';
            }
            else {
                return 'hero6e.RollFail';
            }
        }
        else {
            if (margin > 0) {
                return 'hero6e.ModifiedRollSuccess';
            }
            else if (margin === 0) {
                return 'hero6e.ModifiedRollExactSuccess';
            }
            else {
                return 'hero6e.ModifiedRollFail';
            }
        }
    }
    /**
     * Increment the modifier in response to the button being pressed.
     *
     * @param event Event that triggered the increment
     */
    _incrementModifier(event) {
        event.preventDefault();
        this.modifier = this.modifier + 1;
    }
    /**
     * Rolls the dice based on the current values in the dialog and closes it.
     *
     * @param event Event that triggered the roll
     */
    async _roll(event) {
        event.preventDefault();
        const roll = new Roll('3d6', this._actor.getRollData());
        const result = await roll.evaluate({ async: true });
        const margin = this._base + this.modifier - result.total;
        const msgId = this._getMessageId(result.total, margin, this.modifier);
        result.toMessage({
            flavor: getGame().i18n.format(msgId, {
                description: this._label.toUpperCase(),
                margin: Math.abs(margin),
                modifier: this._formatModifier(this.modifier)
            }),
            speaker: ChatMessage.getSpeaker({ actor: this._actor })
        });
        this.close();
    }
}
//# sourceMappingURL=skill-roll-dialog.js.map