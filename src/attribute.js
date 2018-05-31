export class Attribute {
  constructor(attribute, el, validators) {
    this.attribute = attribute
    this.el = el
    this.validators = validators
  }

  get value() {
    return this.el.type === "checkbox" ? this.el.checked : this.el.value
  }

  get validationMethods() {
    const result = []

    Object.entries(this.validators).forEach(([methodName, { attributes }]) => {
      if (attributes.includes(this.attribute)) {
        result.push(methodName)
      }
    })

    return result
  }
}
