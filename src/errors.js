export class Errors {
  constructor(addCallback, clearAttributeCallback) {
    this.addCallback = addCallback
    this.clearAttributeCallback = clearAttributeCallback
    this.dataMap = new Map()
  }

  clear() {
    return this.dataMap.clear()
  }

  size() {
    return this.dataMap.size
  }

  has(attribute) {
    return this.dataMap.has(attribute)
  }

  get(attribute) {
    return this.dataMap.get(attribute)
  }

  add(attribute, message) {
    if (this.dataMap.has(attribute)) {
      this.dataMap.get(attribute).push(message)
    } else {
      this.dataMap.set(attribute, [message])
    }

    this.addCallback(attribute)
  }

  clearAttribute(attribute) {
    this.dataMap.delete(attribute)
    this.clearAttributeCallback(attribute)
  }

  get forEach() {
    return this.dataMap.forEach
  }
}
