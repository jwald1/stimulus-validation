export function attributeFromElement(el) {
  let value = el.dataset.attr
  attributeNotFound(value)

  value = value.split(".")[1]
  attributeNotFound(value)

  return value
}

function attributeNotFound(value) {
  if (!value) {
    throw new Error("We can't find attribute name. Please add data-attr")
  }
}
