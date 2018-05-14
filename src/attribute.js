export class Attribute {
  constructor(el, validations) {
    this.el = el
    this.validations = validations
  }

  get value() {
    return this.el.type === "checkbox" ? this.el.checked : this.el.value
  }

  validationMethods(attribute) {}
}
