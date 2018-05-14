export function attributeFromElement(el) {
  let value = el.dataset.attr
  value && (value = value.split("."))

  return value && value[1]
}
