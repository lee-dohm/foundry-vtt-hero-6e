import { HeroItemData } from "../item-data"

export default class HeroItem extends Item<HeroItemData> {
  get _itemData() {
    return this.data
  }

  get _itemGameData() {
    return this.data.data
  }
}
