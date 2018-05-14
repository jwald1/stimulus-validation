export class Attribute {
  constructor(attribute, el, validations) {
    this.attribute = attribute
    this.el = el
    this.validations = validations
  }

  get value() {
    return this.el.type === "checkbox" ? this.el.checked : this.el.value
  }

  get validationMethods() {
    const result = []

    Object.entries(this.validations).forEach(([methodName, { attributes }]) => {
      if (attributes.includes(this.attribute)) {
        result.push(methodName)
      }
    })

    return result
  }
}
