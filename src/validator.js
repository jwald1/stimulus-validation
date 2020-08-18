import Validate from "validate.js"

export class Validator {
  constructor(controller) {
    this.controller = controller
  }

  static get validatejs() {
    return Validate
  }

  run(attribute) {
    this.errors.clearAttribute(attribute)

    this.validateRule(attribute)
    this.invokeValidationMethods(attribute)
  }

  validateRule(attribute) {
    const params = this.validatejsParams(attribute)

    if (!params) {
      return
    }

    const messages = this.constructor.validatejs(...params)
    if (messages) {
      messages[attribute].forEach(message =>
        this.errors.add(attribute, message)
      )
    }
  }

  invokeValidationMethods(attribute) {
    const { el, value, validationMethods } = this.attributes.get(attribute)

    validationMethods.forEach(methodName => {
      const method = this.controller[methodName]

      if (!method) {
        throw new Error(`${methodName} is not defined`)
      }

      method.call(this.controller, { attr: attribute, value, el })
    })
  }

  validatejsParams(attribute) {
    const rule = this.rules[attribute]

    if (!rule) {
      return
    }

    const { value } = this.attributes.get(attribute)
    const validateValue = {
      [attribute]: value,
    }

    if (rule.equality) {
      const anotherAttribute = rule.equality.attribute
      const { value } = this.attributes.get(anotherAttribute)
      validateValue[anotherAttribute] = value
    }

    return [validateValue, { [attribute]: this.rules[attribute] }]
  }

  get rules() {
    return this.controller.constructor.rules
  }

  get errors() {
    return this.controller.errors
  }

  get attributes() {
    return this.controller.attributes
  }
}
