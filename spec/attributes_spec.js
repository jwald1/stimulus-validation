import chai, { expect } from "chai"
import chaiDom from "chai-dom"
import { Attributes } from "../src/attributes"
import { Attribute } from "../src/attribute"
import formHtml from "./fixtures/form.html"

chai.use(chaiDom)
chai.use(require("chai-things"))

describe("Attributes", function() {
  before(function() {
    const form = document.createElement("div")
    form.innerHTML = formHtml

    this.form = form

    const controller = {
      identifier: "validations",
      element: form.querySelector('[data-controller="validations"]'),
      constructor: { validators: { agree: { attributes: ["terms"] } } }
    }

    this.attributes = new Attributes(controller)
  })

  describe("validationElements", function() {
    before(function() {
      this.validationElementsArray = Array.from(
        this.attributes.validationElements
      )
    })

    it("returns attr elements", function() {
      const name = this.form.querySelector("#name")
      const email = this.form.querySelector("#email")
      const terms = this.form.querySelector("#terms")

      expect(this.validationElementsArray).to.have.members([name, email, terms])
    })

    it("only includes attr that identifier prefix", function() {
      const address = this.form.querySelector("#address")
      expect(this.validationElementsArray).not.to.include(address)
    })
  })

  describe("createAttributesMap", function() {
    it("creates an Attribute for all attributes", function() {
      const mapKeys = Array.from(this.attributes.dataMap.keys())
      const mapValues = Array.from(this.attributes.dataMap.values())

      expect(mapKeys).to.have.members(["name", "email", "terms"])
      expect(mapValues).to.all.be.an.instanceof(Attribute)
    })
  })
})
