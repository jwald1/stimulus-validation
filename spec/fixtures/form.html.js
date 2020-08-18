export default `<div data-controller="validations">
  <form data-action="submit->validations#validateAll">
    <input type="text" id="name"
      data-action="blur->validations#validate"
      data-attr="validations.name"
    >

    <input type="text" id="email"
      data-action="blur->validations#validate"
      data-attr="validations.email"
    >

    <input type="checkbox" id="terms"
      data-action="blur->validations#validate"
      data-attr="validations.terms"
    >

    <input type="text" data-attr="address" id="address">
    <input type="text" data-attr="my-validations.address" id="city">

    <input type="password" data-attr="validations.password" id="password" data-action="blur->validations#validate">
    <input type="password" data-attr="validations.password_confirmation" id="password_confirmation" data-action="blur->validations#validate">

    <input type="submit" >
  </form>
</div>`
