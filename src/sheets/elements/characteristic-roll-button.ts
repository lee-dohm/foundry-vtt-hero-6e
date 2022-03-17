/**
 * Represents a button that, when clicked, executes a characteristic roll.
 */
export default class CharacteristicRollButton extends HTMLButtonElement {
  /**
   * Gets the unmodified roll value.
   */
  get rollBase(): number {
    if (!this.dataset.rollBase) {
      throw new Error('data-roll-base must be defined on all characteristic roll buttons')
    }

    return parseInt(this.dataset.rollBase)
  }

  /**
   * Gets the name of the roll.
   */
  get rollLabel(): string {
    if (!this.dataset.rollLabel) {
      throw new Error('data-roll-label must be defined on all characteristic roll buttons')
    }

    return this.dataset.rollLabel
  }
}
