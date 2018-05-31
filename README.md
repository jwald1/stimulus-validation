# Stimulus Validation

stimulus-validation helps validate user input and helps you display errors.

It does not dictate how the errors are displayed; instead, all errors are stored in the `errors` object, and it is up to the developer how to display them. Stimulus-validation has two types of validations, built-in validators, and custom validators. The built-in validators are a wrapper for Validatejs so you can all Validatejs' validators expect equality validator.

[Codepen Demo](https://codepen.io/jwald1/pen/zaGdZN?editors=1010)

### Installation

```Javascript
  yarn install stimulus-validation
```

### Basic Usage

Let's build a simple signup form with name and email fields.

#### Controller

In your controller extend validation-controller

```javascript
// controllers/signup_validation_controller.js

import { ValidationController } from "stimulus-validation"

export default class extends ValidationController {}
```

We want to make the name and email required and also validate the email.

So we need to define these rules. In the controller add:

```Javascript
  static rules = {
    email: { presence: { allowEmpty: false }, email: true},
    name: { presence: { allowEmpty: false } }
  }
```

Each key in rules corresponds to an attribute defined in the markup.

### HTML

```HTML
  <form data-controller="signup-validation" data-action="submit->signup-validation#validateAll">
    <div class="field">
      <input
        type="text"   data-action="blur->signup-validation#validate"
        data-attr="signup-validation.name"
      >
      <div class="error-message"></div>
    </div>

    <div class="field">
      <input
        type="text"   data-action="blur->signup-validation#validate"
        data-attr="signup-validation.email"
      >
      <div class="error-message"></div>
    </div>
  </form>
```

On each field you have to add `data-attr` it uses the same syntax as `data-target`
identifier.ATTRNAME

There are two methods `validate` and `validateAll`

`validate` validates a single input and `validateAll` validates the entire form
and prevents form submission if an error is found.

#### displaying errors

To display errors, we can utilize `afterValidate` callback.

```Javascript
  afterValidate({ el, attr }) {
    this.errorMessageEl(el).textContent = this.errorMessage(attr)
  }

  errorMessageEl(el) {
    return el.closest(".field").querySelector(".error-message")
  }

  errorMessage(attr) {
    return this.errors.has(attr) ? this.errors.get(attr)[0] : ""
  }
```

The important part is what's happening in the `errorMessage` method. We check if the `errors` object has error messages for the attr if it has we return the first error message.

#### Custom validators

To define a custom validator, you first write a method that adds a message to the `errors` object

Let's say we want to validate the input length to be equal to 10.

```javascript
  validLength({attr, value}) {
    if(value.length !== 10) {
	    this.errors.add(attr, 'must be 10 chars long')
    }
  }
```

After defining the validator we need to register it and specify the attributes the validator should validate.

```javascript
  static validators = { validLength: { attributes: ['someAttr' ]  } }
```

### TODO

Rewrite README

### Contributing

Bug reports and pull requests are welcome on GitHub at https://github.com/jwald1/stimulus-validation. This project is intended to be a safe, welcoming space for collaboration, and contributors are expected to adhere to the Contributor Covenant code of conduct.

### License

This package is available as open source under the terms of the MIT License.
