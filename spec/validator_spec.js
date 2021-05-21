import chai, { expect } from "chai"
import sinon from "sinon"
import sinonChai from "sinon-chai"
import { Errors } from "../src/errors"
import { Attributes } from "../src/attributes"
import { Validator } from "../src/validator"
import formHtml from "./fixtures/form.html"

chai.use(sinonChai)
const sandbox = sinon.sandbox

describe("Validator", function() {
  beforeEach(function() {
    const form = document.createElement("div")
    form.innerHTML = formHtml

    this.form = form

    this.controller = {
      errors: new Errors(),
      identifier: "validations",
      element: form.querySelector('[data-controller="validations"]'),
      ["constructor"]: {
        validators: { agree: { attributes: ["terms"] } },
        rules: {
          name: { presence: { allowEmpty: false } },
          email: { presence: { allowEmpty: false }, email: true }
        },
        validatorOptions: {
          fullMessages: false
        }
      }
    }

    this.controller.attributes = new Attributes(this.controller)
    this.validator = new Validator(this.controller)
  })

  afterEach(function() {
    sandbox.restore()
  })

  describe("invokeValidationMethods", function() {
    context("method not defined", function() {
      it("throws", function() {
        const method = this.validator.invokeValidationMethods.bind(
          this.validator,
          "terms"
        )
        expect(method).to.throw("agree is not defined")
      })
    })

    context("method defined", function() {
      it("invokes the method", function() {
        this.controller.agree = function() {}
        sandbox.stub(this.controller, "agree")
        const terms = this.form.querySelector("#terms")
        const params = { attr: "terms", value: false, el: terms }

        this.validator.invokeValidationMethods("terms")
        expect(this.controller.agree).to.have.been.calledWith(params)
      })
    })
  })

  describe("run", function() {
    beforeEach(function() {
      sandbox.stub(this.validator, "validateRule")
      sandbox.stub(this.validator, "invokeValidationMethods")
    })

    it("clears the error before running", function() {
      this.validator.errors.add("attr", "some message")
      this.validator.run("attr")

      expect(this.validator.errors.has("attr")).to.be.false
    })

    it("calls validateRule and invokeValidationMethods", function() {
      this.validator.run("attr")

      expect(this.validator.validateRule).to.have.been.calledWith("attr")
      expect(this.validator.invokeValidationMethods).to.have.been.calledWith(
        "attr"
      )
    })
  })

  describe("validateRule", function() {
    context("undefined rule", function() {
      it("returns undefined", function() {
        expect(this.validator.validateRule("terms")).to.be.undefined
      })
    })

    context("no errors", function() {
      it("returns undefined", function() {
        const name = this.form.querySelector("#name")
        name.textContent = "Jacob"

        expect(this.validator.validateRule("name")).to.be.undefined
      })
    })

    context("has errors", function() {
      it("adds error messages to Errors", function() {
        this.validator.validateRule("name")

        expect(this.controller.errors.has("name")).to.be.true
      })

      it("adds each error to Errors", function() {
        this.validator.validateRule("email")

        expect(this.controller.errors.has("email")).to.be.true
        expect(this.controller.errors.size).to.eql(2)
      })
    })
  })

  describe("validatejsParams", function() {
    context("rule not found", function() {
      it("returns undefined", function() {
        expect(this.validator.validatejsParams("terms")).to.be.undefined
      })
    })

    context("rule defined", function() {
      it("returns validatajs params", function() {
        const params = [
          { name: "" },
          { name: { presence: { allowEmpty: false } } },
          { fullMessages: false }
        ]

        expect(this.validator.validatejsParams("name")).to.eql(params)
      })
    })
  })
})
