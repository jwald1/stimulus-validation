export class Errors {
  constructor() {
    this.dataMap = new Map()
  }

  clear() {
    return this.dataMap.clear()
  }

  get size() {
    const arrayOfmessages = Array.from(this.dataMap.values())

    return arrayOfmessages.reduce(
      (total, messages) => (total += messages.length),
      0
    )
  }

  hasAny() {
    return !!this.size
  }

  has(attribute) {
    return this.dataMap.has(attribute)
  }

  get(attribute) {
    return this.dataMap.get(attribute)
  }

  add(attribute, message) {
    const attributesMessages = this.dataMap.get(attribute) || []
    attributesMessages.push(message)

    this.dataMap.set(attribute, attributesMessages)
  }

  clearAttribute(attribute) {
    this.dataMap.delete(attribute)
  }

  forEach(...args) {
    return this.dataMap.forEach(...args)
  }
}
