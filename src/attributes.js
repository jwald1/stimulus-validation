import { Attribute } from "./attribute"
import { attributeFromElement } from "./element_attribute"

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
      const attrName = attributeFromElement(el)

      this.add(attrName, el)
    })
  }

  get size() {
    return this.dataMap.size
  }

  refresh() {
    this.createAttributesMap()
  }

  has(value) {
    return this.dataMap.has(value)
  }

  add(attrName, el, validators = this.validators) {
    const attribute = new Attribute(attrName, el, validators)
    this.dataMap.set(attrName, attribute)

    return attribute
  }

  forEach(...args) {
    return this.dataMap.forEach(...args)
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

  get validators() {
    return this.controller.constructor.validators
  }
}
