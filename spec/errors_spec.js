import chai, { expect } from "chai"
import sinon from "sinon"
import sinonChai from "sinon-chai"
import { Errors } from "../src/errors"

chai.use(sinonChai)

const addCallback = sinon.spy()
const clearAttributeCallback = sinon.spy()
const errors = new Errors(addCallback, clearAttributeCallback)

beforeEach(function() {
  errors.clear()
})

describe("add", function() {
  context("first message added", function() {
    it("adds message to attributes array", function() {
      errors.add("someAttr", "not valid")

      expect(errors.has("someAttr")).to.be.true
      expect(errors.get("someAttr")).to.eql(["not valid"])
    })
  })

  context("second message added", function() {
    it("does not overwrite previous messages", function() {
      errors.add("someAttr", "not valid")
      errors.add("someAttr", "this is also not valid")

      expect(errors.get("someAttr")).to.include("not valid")
      expect(errors.get("someAttr")).to.include("this is also not valid")
    })
  })

  it("calls addCallback with attribute", function() {
    errors.add("someAttr", "not valid")

    expect(addCallback).to.have.been.calledWith("someAttr")
  })
})

describe("clearAttribute", function() {
  it("clears the given attribute's messages", function() {
    errors.add("someAttr", "not valid")
    errors.clearAttribute("someAttr")

    expect(errors.has("someAttr")).to.be.false
  })

  it("calls clearAttributeCallback with attribute", function() {
    errors.add("someAttr", "not valid")
    errors.clearAttribute("someAttr")

    expect(clearAttributeCallback).to.have.been.calledWith("someAttr")
  })
})
