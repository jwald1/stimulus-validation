import { expect } from "chai"
import { Attribute } from "../src/attribute"
import formHtml from "./fixtures/form.html"

beforeEach(function() {
  this.form = document.createElement("div")
  this.form.innerHTML = formHtml
})

describe("value", function() {
  it("returns value of element", function() {
    const el = this.form.querySelector("#name")

    const attribute = new Attribute(el, {})
    expect(attribute.value).to.eql(this.form.querySelector("#name").value)
  })

  it("returns boolean if element is a checkbox", function() {
    const el = this.form.querySelector("#terms")
    const attribute = new Attribute(el, {})

    expect(attribute.value).to.eql(false)
  })
})
