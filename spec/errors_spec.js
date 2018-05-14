import { expect } from "chai"
import { Errors } from "../src/errors"

const errors = new Errors()

beforeEach(function() {
  errors.clear()
})

describe("size", function() {
  it("few messages for the same attr", function() {
    errors.add("attr", "not valid")
    errors.add("attr", "not valid")

    expect(errors.size).to.eql(2)
  })

  it("multiple attributes", function() {
    errors.add("attr", "not valid")
    errors.add("attr1", "not valid")

    expect(errors.size).to.eql(2)
  })

  it("no messages", function() {
    expect(errors.size).to.eql(0)
  })
})

describe("hasAny", function() {
  it("returns true when it has messages", function() {
    errors.add("attr", "not valid")

    expect(errors.hasAny()).to.eql(true)
  })

  it("returns false when it has no messages", function() {
    expect(errors.hasAny()).to.eql(false)
  })
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
})

describe("clearAttribute", function() {
  it("clears the given attribute's messages", function() {
    errors.add("someAttr", "not valid")
    errors.clearAttribute("someAttr")

    expect(errors.has("someAttr")).to.be.false
  })
})
