import { HERO_CONFIG } from '../config.js'
import HeroLog from '../logging.js'
import { SkillRollDialog } from '../dialogs/skill-roll-dialog.js'
import { getGame } from '../helpers/global-helpers.js'

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
      height: 835,
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

    html.find('.rollable-characteristic').on('click', (event) => this.onCharacteristicRoll(event))
    html.find('.item-create').on('click', (event) => this.onItemCreate(event))
    html.find('.item-delete').on('click', (event) => this.onItemDelete(event))
    html.find('.item-edit').on('click', (event) => this.onItemEdit(event))
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
  protected async onCharacteristicRoll(event: JQuery.ClickEvent) {
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

  /**
   * Handler for the various add item links on the actor sheet.
   *
   * @param event Click event for the "Add" link.
   */
  protected async onItemCreate(event: JQuery.ClickEvent) {
    event.preventDefault()

    if (event.currentTarget) {
      const link = event.currentTarget as HTMLElement

      if (!link.dataset.itemType) {
        throw new Error('The data-item-type attribute must be set on all item create links')
      }

      const itemType = link.dataset.itemType
      const itemData = {
        name: getGame().i18n.format('hero6e.ItemNew', {
          type: getGame().i18n.localize(`hero6e.ItemType${itemType.capitalize()}`)
        }),
        type: itemType,
        data: {}
      }

      this.actor.createEmbeddedDocuments('Item', [itemData])
    }
  }

  /**
   * Handler for the various item delete links on the actor sheet.
   *
   * @param event Click event for an item delete link.
   */
  protected async onItemDelete(event: JQuery.ClickEvent) {
    event.preventDefault()

    if (event.currentTarget) {
      const link = event.currentTarget as HTMLElement

      if (!link.dataset.itemId) {
        throw new Error('The data-item-id attribute must be set on all item delete links')
      }

      const itemId = link.dataset.itemId
      const item = this.actor.items.get(itemId)

      item?.delete()
    }
  }

  /**
   * Handler for the various item edit links on the actor sheet.
   *
   * @param event Click event for an item edit link.
   */
  protected async onItemEdit(event: JQuery.ClickEvent) {
    event.preventDefault()

    if (event.currentTarget) {
      const link = event.currentTarget as HTMLElement

      if (!link.dataset.itemId) {
        throw new Error('The data-item-id attribute must be set on all item edit links')
      }

      const itemId = link.dataset.itemId
      const item = this.actor.items.get(itemId)

      item?.sheet?.render(true)
    }
  }
}
