/**
 * Hero game system Item logic.
 */
export default class HeroItem extends Item {
  get _itemData() {
    return this.data
  }

  get _itemGameData() {
    return this.data.data
  }
}
