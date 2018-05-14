import { Attribute } from "./attribute"

export class Attributes {
  constructor(controller) {
    this.controller = controller
    this.dataMap = new Map()

    this.createAttributesMap()
  }

  get(attribute) {
    return this.dataMap.get(attribute)
  }

  createAttributesMap() {
    this.validationElements.forEach(el => {
      const attribute = el.dataset.attr.split(".")[1]

      this.dataMap.set(
        attribute,
        new Attribute(attribute, el, this.validations)
      )
    })
  }

  get validationElements() {
    return this.element.querySelectorAll(`[data-attr^="${this.identifier}."]`)
  }

  get identifier() {
    return this.controller.identifier
  }

  get element() {
    return this.controller.element
  }

  get validations() {
    return this.controller.constructor.validations
  }
}
