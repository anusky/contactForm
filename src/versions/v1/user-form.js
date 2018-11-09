import React, { Component } from 'react'
import { validateType } from './validation'

class UserForm extends Component {
  state = {
    // firstName: "anusky",
    // username: "anusky123",
    // email: "anusky.pitrusky@gmail.com",
    // password1: "",
    // password2: "",
    addressList: ['City', 'Postalcode'],
    form: {
      firstName: '',
      username: '',
      email: '',
      password1: '',
      password2: '',
      country: '',
      addressPostalcode: '',
      addressCity: '',
      addressPostalcodeInvoice: '',
      addressCityInvoice: '',
      copyAddress: false
    },
    error: {
      firstName: false,
      username: false,
      email: false,
      password1: false,
      password2: false,
      country: false,
      addressPostalcode: false,
      addressCity: false,
      addressPostalcodeInvoice: false,
      addressCityInvoice: false,
      copyAddress: false
    },
    validated: {
      firstName: true,
      username: true,
      email: true,
      password1: true,
      password2: true,
      country: true,
      addressPostalcode: true,
      addressCity: true,
      addressCityInvoice: true,
      addressPostalcodeInvoice: true,
      copyAddress: true
    },
    mandatory: {
      firstName: false,
      username: true,
      email: true,
      password1: true,
      password2: true,
      country: true,
      addressPostalcode: true,
      addressCity: false,
      addressPostalcodeInvoice: true,
      addressCityInvoice: false,
      copyAddress: false
    },
    validationTypes: {
      firstName: [{ method: 'maxlength', length: 8 }],
      username: [{ method: 'maxlength', length: 8 }],
      email: [{ method: 'email' }],
      password1: [],
      password2: [{ method: 'comparison' }],
      country: [],
      addressPostalcode: [{ method: 'postalcode' }],
      addressCity: [{ method: 'maxlength', length: 30 }],
      addressPostalcodeInvoice: [{ method: 'postalcode' }],
      addressCityInvoice: [{ method: 'maxlength', length: 30 }],
      copyAddress: []
    },
    countries: ['España', 'Inglaterra']
  }

  handleValidateUnitaryInput = (
    element,
    data = { value: this.state.form[element] }
  ) => {
    let stateAux = this.state
    const { validationTypes } = this.state
    stateAux.validated[element] = false
    if (!validationTypes[element]) {
      console.log('validationTypes[element] ', element)
    }
    validationTypes[element].length > 0
      ? validationTypes[element].forEach(actualType => {
          stateAux.validated[element] =
            stateAux.validated[element] || validateType(actualType, data)
        })
      : (stateAux.validated[element] = true)
    return stateAux
  }

  handleValidateInputs = () => {
    let stateAux = this.state
    if (this.props.formEdit) {
      stateAux.form = this.props.formEdit
      for (let el in stateAux.form) {
        stateAux = this.handleValidateUnitaryInput(el, {
          value: stateAux.form[el]
        })
      }
    }
    this.setState(stateAux)
  }
  componentDidMount(prevProps, prevState) {
    console.log('props componentDidMount ', this.props)
    this.handleValidateInputs()
  }

  handleGenericChange = formName => event => {
    this.setState({
      form: { ...this.state.form, [formName]: event.target.value }
    })
  }

  handleFirstNameChangeAux = this.handleGenericChange('firstName')

  handleSubmit = event => {
    event.preventDefault()
    let stateErrorAux = this.state.error
    for (let el in this.state.form) {
      this.handleValidateUnitaryInput(el)
      stateErrorAux[el] =
        !this.state.validated[el] ||
        !validateType(
          { method: 'mandatory' },
          {
            value: this.state.form[el],
            mandatory: this.state.mandatory[el]
          }
        )
    }

    console.log('stateErrorAux ', stateErrorAux)
    this.setState({ error: stateErrorAux })
  }

  //firstName
  // handleFirstNameChange = event => {
  //   this.setState({
  //     form: { ...this.state.form, firstName: event.target.value }
  //   })
  // }
  handleValidateFirstName = event => {
    const { firstName } = this.handleValidateUnitaryInput('firstName').validated

    this.setState({
      validated: {
        ...this.state.validated,
        [event.target.id]: firstName
      }
    })
  }

  //username
  handleUsernameChange = event => {
    this.setState({
      form: { ...this.state.form, username: event.target.value }
    })
  }

  handleValidateUsername = event => {
    const { username } = this.handleValidateUnitaryInput('username').validated

    this.setState({
      validated: {
        ...this.state.validated,
        [event.target.id]: username
      }
    })
  }

  //email
  handleEmailChange = event => {
    this.setState({
      form: { ...this.state.form, email: event.target.value }
    })
  }
  handleValidateEmail = event => {
    const { email } = this.handleValidateUnitaryInput('email').validated

    this.setState({
      validated: { ...this.state.validated, [event.target.id]: email }
    })
  }

  //password1
  handlePassword1Change = event => {
    this.setState({
      form: { ...this.state.form, password1: event.target.value }
    })
  }
  handleValidatePassword1 = event => {
    const { password1 } = this.handleValidateUnitaryInput('password1').validated

    this.setState({
      validated: {
        ...this.state.validated,
        [event.target.id]: password1
      }
    })
  }
  //password2
  handlePassword2Change = event => {
    this.setState({
      form: { ...this.state.form, password2: event.target.value }
    })
  }
  handleValidatePassword2 = event => {
    const { form } = this.state
    const { password2 } = this.handleValidateUnitaryInput('password2', {
      value: form.password1,
      value2: form.password2
    }).validated

    this.setState({
      validated: {
        ...this.state.validated,
        [event.target.id]: password2
      }
    })
  }

  //country
  handleCountryChange = event => {
    this.setState({
      form: { ...this.state.form, country: event.target.value }
    })
  }
  // validateCountry = event => {
  //   const validatedCountry = this.state.form.country.length < 8
  //   this.setState({
  //     validated: {
  //       ...this.state.validated,
  //       [event.target.id]: validatedCountry
  //     }
  //   })
  // }

  //addressPostalcode
  handleAddressPostalcodeChange = event => {
    this.setState({
      form: { ...this.state.form, addressPostalcode: event.target.value }
    })
  }
  handleValidateAddressPostalcode = event => {
    const { addressPostalcode } = this.handleValidateUnitaryInput(
      'addressPostalcode',
      {
        value: this.state.form.addressPostalcode
      }
    ).validated
    this.setState({
      validated: {
        ...this.state.validated,
        [event.target.id]: addressPostalcode
      }
    })
  }

  //addressCity
  handleAddressCityChange = event => {
    this.setState({
      form: { ...this.state.form, addressCity: event.target.value }
    })
  }
  handleValidateAddressCity = event => {
    const { addressCity } = this.handleValidateUnitaryInput('addressCity', {
      value: this.state.form.addressCity
    }).validated

    this.setState({
      validated: {
        ...this.state.validated,
        [event.target.id]: addressCity
      }
    })
  }

  //copyAddress
  handleCopyAddressChange = event => {
    let stateAux = this.state
    stateAux.form.copyAddress = event.target.checked
    stateAux.addressList.forEach(type => {
      stateAux.form[`address${type}Invoice`] = event.target.checked
        ? stateAux.form[`address${type}`]
        : ''
    })
    this.setState(stateAux)
  }

  //addressPostalcodeInvoice
  handleAddressPostalcodeInvoiceChange = event => {
    this.setState({
      form: { ...this.state.form, addressPostalcodeInvoice: event.target.value }
    })
  }
  handleValidateAddressPostalcodeInvoice = event => {
    const { addressPostalcodeInvoice } = this.handleValidateUnitaryInput(
      'addressPostalcodeInvoice',
      {
        value: this.state.form.addressPostalcodeInvoice
      }
    ).validated
    this.setState({
      validated: {
        ...this.state.validated,
        [event.target.id]: addressPostalcodeInvoice
      }
    })
  }

  //addressCityInvoice
  handleAddressCityInvoiceChange = event => {
    this.setState({
      form: { ...this.state.form, addressCityInvoice: event.target.value }
    })
  }
  handleValidateAddressCityInvoice = event => {
    const { addressCityInvoice } = this.handleValidateUnitaryInput(
      'addressCityInvoice',
      {
        value: this.state.form.addressCityInvoice
      }
    ).validated

    this.setState({
      validated: {
        ...this.state.validated,
        [event.target.id]: addressCityInvoice
      }
    })
  }
  render() {
    const validatedStyle = valid => ({ color: valid ? 'green' : 'red' })
    const {
      firstName,
      username,
      email,
      password1,
      password2,
      addressPostalcode,
      addressCity,
      addressCityInvoice,
      addressPostalcodeInvoice
    } = this.state.validated
    return (
      <form onSubmit={this.handleSubmit}>
        <label htmlFor="firstName">
          firstName
          <input
            className={`input- ${
              this.state.error.firstName ? `input__error` : ``
            }`}
            id="firstName"
            value={this.state.form.firstName}
            onChange={this.handleFirstNameChangeAux}
            onBlur={this.handleValidateFirstName}
            type="text"
          />
          <div style={validatedStyle(firstName)}>
            {' '}
            {`validated: ${firstName}`}
          </div>
        </label>
        <label htmlFor="username">
          username
          <input
            className={`input- ${
              this.state.error.username ? `input__error` : ``
            }`}
            id="username"
            value={this.state.form.username}
            onChange={this.handleUsernameChange}
            onBlur={this.handleValidateUsername}
            type="text"
          />
          <div style={validatedStyle(username)}>
            {' '}
            {`validated: ${username}`}
          </div>
        </label>
        <label htmlFor="email">
          email
          <input
            className={`input- ${this.state.error.email ? `input__error` : ``}`}
            id="email"
            value={this.state.form.email}
            onChange={this.handleEmailChange}
            onBlur={this.handleValidateEmail}
            type="email"
          />
          <div style={validatedStyle(email)}> {`validated: ${email}`}</div>
        </label>
        <label htmlFor="password1">
          password1
          <input
            className={`input- ${
              this.state.error.password1 ? `input__error` : ``
            }`}
            id="password1"
            value={this.state.form.password1}
            onChange={this.handlePassword1Change}
            onBlur={this.handleValidatePassword1}
            type="password"
          />
          <div style={validatedStyle(password1)}>
            {' '}
            {`validated: ${password1}`}
          </div>
        </label>
        <label htmlFor="password2">
          password2
          <input
            className={`input- ${
              this.state.error.password2 ? `input__error` : ``
            }`}
            id="password2"
            value={this.state.form.password2}
            onChange={this.handlePassword2Change}
            onBlur={this.handleValidatePassword2}
            type="password"
          />
          <div style={validatedStyle(password2)}>
            {' '}
            {`validated: ${password2}`}
          </div>
        </label>
        <label htmlFor="country">
          country
          <select
            className={`input- ${
              this.state.error.country ? `input__error` : ``
            }`}
            onChange={this.handleCountryChange}
            onBlur={this.handleCountryChange}
            value={this.state.form.country}
          >
            <option />
            {this.state.countries.map((country, key) => (
              <option key={country} value={country}>
                {' '}
                {country}{' '}
              </option>
            ))}
          </select>
        </label>
        <label htmlFor="addressPostalcode">
          addressPostalcode
          <input
            className={`input- ${
              this.state.error.addressPostalcode ? `input__error` : ``
            }`}
            onChange={this.handleAddressPostalcodeChange}
            onBlur={this.handleValidateAddressPostalcode}
            value={this.state.form.addressPostalcode}
            type="number"
          />
          <div style={validatedStyle(addressPostalcode)}>
            {' '}
            {`validated: ${addressPostalcode}`}
          </div>
        </label>
        <label htmlFor="addressCity">
          addressCity
          <input
            className={`input- ${
              this.state.error.addressCity ? `input__error` : ``
            }`}
            onChange={this.handleAddressCityChange}
            onBlur={this.handleValidateAddressCity}
            value={this.state.form.addressCity}
            type="text"
          />
          <div style={validatedStyle(addressCity)}>
            {' '}
            {`validated: ${addressCity}`}
          </div>
        </label>
        <label htmlFor="copyAddress">
          copyAddress
          <input
            className={`input- ${
              this.state.error.copyAddress ? `input__error` : ``
            }`}
            onChange={this.handleCopyAddressChange}
            value={this.state.form.copyAddress}
            type="checkbox"
          />
        </label>
        <label htmlFor="addressPostalcodeInvoice">
          addressPostalcodeInvoice
          <input
            className={`input- ${
              this.state.error.addressPostalcodeInvoice ? `input__error` : ``
            }`}
            onChange={this.handleAddressPostalcodeInvoiceChange}
            onBlur={this.handleValidateAddressPostalcodeInvoice}
            value={this.state.form.addressPostalcodeInvoice}
            type="number"
          />
          <div style={validatedStyle(addressPostalcodeInvoice)}>
            {' '}
            {`validated: ${addressPostalcodeInvoice}`}
          </div>
        </label>
        <label htmlFor="addressCityInvoice">
          addressCityInvoice
          <input
            className={`input- ${
              this.state.error.addressCityInvoice ? `input__error` : ``
            }`}
            onChange={this.handleAddressCityInvoiceChange}
            onBlur={this.handleValidateAddressCityInvoice}
            value={this.state.form.addressCityInvoice}
            type="text"
          />
          <div style={validatedStyle(addressCityInvoice)}>
            {' '}
            {`validated: ${addressCityInvoice}`}
          </div>
        </label>
        <input type="submit" value="Submit" />
      </form>
    )
  }
}
export default UserForm
