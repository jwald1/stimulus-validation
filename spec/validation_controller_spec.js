import chai, { expect } from "chai"
import sinon from "sinon"
import sinonChai from "sinon-chai"
import { Errors } from "../src/errors"
import { Attributes } from "../src/attributes"
import { Validator } from "../src/validator"
import { ValidationController } from "../src/validation_controller"
import formHtml from "./fixtures/form.html"

chai.use(sinonChai)
const sandbox = sinon.sandbox

describe("ValidationController", function() {
  before(function() {
    const form = document.createElement("div")
    form.innerHTML = formHtml
    document.body.appendChild(form)

    const context = {
      scope: {
        element: form.querySelector("[data-controller]"),
        identifier: "validations"
      }
    }

    this.controller = new ValidationController()
    this.controller.context = context
    this.controller.connect()
  })

  describe("validate", function() {
    context("element does not have data-attr", function() {
      it("throws", function() {
        const fn = this.controller.validate.bind(null, {
          currentTarget: document.createElement("div")
        })
        expect(fn).to.throw
      })
    })

    context("element added after initalize", function() {
      beforeEach(function() {
        const el = document.createElement("div")
        el.innerHTML = '<input data-attr="validations.someNewAttr">'

        this.event = {
          currentTarget: el.firstElementChild
        }

        sandbox.stub(this.controller, "runValidator")
        sandbox.stub(this.controller, "afterValidate")
      })

      afterEach(function() {
        sandbox.restore()
      })

      it("runs validation on it", function() {
        const el = this.event.currentTarget
        this.controller.validate(this.event)

        expect(this.controller.runValidator).has.been.calledWith("someNewAttr")
        expect(this.controller.afterValidate).has.been.calledWith({
          el,
          name: "someNewAttr",
          value: ""
        })
      })
    })
  })

  describe("validateAll", function() {
    it("runs validations on each attribute", function() {})

    it("calls afterValidate callback foreach attribute", function() {})

    it("calls preventDefault if there is any error", function() {})

    it("calls afterValidateAll with the event", function() {})
  })
})
