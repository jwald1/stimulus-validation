import { Controller } from "stimulus"
import { Attributes } from "./attributes"
import { Errors } from "./errors"
import { Validator } from "./validator"
import { attributeFromElement } from "./element_attribute"

export class ValidationController extends Controller {
  static rules = {} // overwirde in subclass
  static validators = [] // overwirde in subclass

  connect() {
    this.errors = new Errors()
    this.attributes = new Attributes(this)
    this._validator = new Validator(this)
  }

  validate(event) {
    const el = event.currentTarget
    const attribute = attributeFromElement(el)

    if (!this.attributes.has(attribute)) {
      this.attributes.add(attribute, el)
    }

    const { value } = this.attributes.get(attribute)

    this.runValidator(attribute)
    this.afterValidate({ el, attr: attribute, value })
  }

  afterValidate(attribute) {
    // overwirde in subclass
  }

  afterValidateAll(event) {
    // overwirde in subclass
  }

  runValidator(attribute) {
    this._validator.run(attribute)
  }

  validateAll(event) {
    this.attributes.refresh()
    this.errors.clear()

    this.attributes.forEach(({ el, value }, attribute) => {
      this.runValidator(attribute)

      if (this.errors.hasAny()) {
        event.preventDefault()
      }
      this.afterValidate({ el, attr: attribute, value })
    })

    this.afterValidateAll(event)
  }

  get validatejs() {
    return Validator.validatejs
  }

  static get validatejs() {
    return Validator.validatejs
  }
}
