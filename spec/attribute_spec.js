import { expect } from "chai"
import { Attribute } from "../src/attribute"
import formHtml from "./fixtures/form.html"

describe("Attribute", function() {
  before(function() {
    this.form = document.createElement("div")
    this.form.innerHTML = formHtml
  })

  describe("value", function() {
    it("returns value of element", function() {
      const el = this.form.querySelector("#name")

      const attribute = new Attribute("name", el, {})
      expect(attribute.value).to.eql(this.form.querySelector("#name").value)
    })

    it("returns boolean if element is a checkbox", function() {
      const el = this.form.querySelector("#terms")
      const attribute = new Attribute("terms", el, {})

      expect(attribute.value).to.eql(false)
    })
  })

  describe("validationMethods", function() {
    it("returns an array of custom validation methods registered on the attribute", function() {
      const el = this.form.querySelector("#name")
      const validators = {
        required: { attributes: ["name"] },
        long: { attributes: ["name", "address"] }
      }
      const attribute = new Attribute("name", el, validators)
      expect(attribute.validationMethods).to.have.members(["required", "long"])
    })
  })
})
