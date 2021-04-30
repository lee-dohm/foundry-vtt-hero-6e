export default class HeroItemSheet extends ItemSheet {
  get template() {
    console.log(`hero6e | Returning template: systems/hero6e/templates/sheets/${this.item.type}-sheet.html`)

    return `systems/hero6e/templates/sheets/${this.item.type}-sheet.html`
  }

  getData() {
    const data = super.getData()

    data.config = CONFIG.hero6e

    return data
  }
}
