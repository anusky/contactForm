import React, { Component } from 'react'
import { validateType } from './validation'

class UserForm extends Component {
  state = {
    // firstName: "anusky",
    // username: "anusky123",
    // email: "anusky.pitrusky@gmail.com",
    // password1: "",
    // password2: "",
    addressList: ['City', 'Postalcode', 'Phone'],
    form: {
      firstName: '',
      username: '',
      email: '',
      password1: '',
      password2: '',
      country: '',
      addressPostalcode: '',
      addressCity: '',
      addressPhone: '',
      addressPostalcodeInvoice: '',
      addressCityInvoice: '',
      addressPhoneInvoice: '',
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
      addressPhone: false,
      addressPostalcodeInvoice: false,
      addressCityInvoice: false,
      addressPhoneInvoice: false,
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
      addressPhone: true,
      addressCityInvoice: true,
      addressPostalcodeInvoice: true,
      addressPhoneInvoice: true,
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
      addressPhone: false,
      addressPostalcodeInvoice: true,
      addressCityInvoice: false,
      addressPhoneInvoice: false,
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
      addressPhone: [{ method: 'telephone' }],
      addressPostalcodeInvoice: [{ method: 'postalcode' }],
      addressCityInvoice: [{ method: 'maxlength', length: 30 }],
      addressPhoneInvoice: [{ method: 'telephone' }],
      copyAddress: []
    },
    countries: ['España', 'Inglaterra'],
    languages: ['Español', 'English']
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

  handleFirstNameChange = this.handleGenericChange('firstName')
  handleUsernameChange = this.handleGenericChange('username')
  handleEmailChange = this.handleGenericChange('email')
  handlePassword1Change = this.handleGenericChange('password1')
  handlePassword2Change = this.handleGenericChange('password2')
  handleCountryChange = this.handleGenericChange('country')
  handleAddressPostalcodeChange = this.handleGenericChange('addressPostalcode')
  handleAddressCityChange = this.handleGenericChange('addressCity')
  handleAddressPhoneChange = this.handleGenericChange('addressPhone')
  handleAddressPostalcodeInvoiceChange = this.handleGenericChange(
    'addressPostalcodeInvoice'
  )
  handleAddressCityInvoiceChange = this.handleGenericChange(
    'addressCityInvoice'
  )
  handleAddressPhoneInvoiceChange = this.handleGenericChange(
    'addressPhoneInvoice'
  )

  handleGenericValidate = formName => event => {
    let data =
      formName === 'password2'
        ? {
            value: this.state.form.password2,
            value2: this.state.form.password1
          }
        : undefined
    const { [formName]: validated } = this.handleValidateUnitaryInput(
      formName,
      data
    ).validated

    this.setState({
      validated: {
        ...this.state.validated,
        [event.target.id]: validated
      }
    })
  }

  handleValidateFirstName = this.handleGenericValidate('firstName')
  handleValidateUsername = this.handleGenericValidate('username')
  handleValidateEmail = this.handleGenericValidate('email')
  handleValidatePassword1 = this.handleGenericValidate('password1')
  handleValidatePassword2 = this.handleGenericValidate('password2')
  handleValidateAddressPostalcode = this.handleGenericValidate(
    'addressPostalcode'
  )
  handleValidateAddressCity = this.handleGenericValidate('addressCity')
  handleValidateAddressPhone = this.handleGenericValidate('addressPhone')
  handleValidateAddressCityInvoice = this.handleGenericValidate(
    'addressCityInvoice'
  )
  handleValidateAddressPostalcodeInvoice = this.handleGenericValidate(
    'addressPostalcodeInvoice'
  )
  handleValidateAddressPhoneInvoice = this.handleGenericValidate(
    'addressPhoneInvoice'
  )

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
      addressPhone,
      addressCityInvoice,
      addressPostalcodeInvoice,
      addressPhoneInvoice
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
            onChange={this.handleFirstNameChange}
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
        <label htmlFor="addressPhone">
          addressPhone
          <input
            className={`input- ${
              this.state.error.addressPhone ? `input__error` : ``
            }`}
            onChange={this.handleAddressPhoneChange}
            onBlur={this.handleValidateAddressPhone}
            value={this.state.form.addressPhone}
            type="tel"
          />
          <div style={validatedStyle(addressPhone)}>
            {' '}
            {`validated: ${addressPhone}`}
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
        <label htmlFor="addressPhoneInvoice">
          addressPhoneInvoice
          <input
            className={`input- ${
              this.state.error.addressPhoneInvoice ? `input__error` : ``
            }`}
            onChange={this.handleAddressPhoneInvoiceChange}
            onBlur={this.handleValidateAddressPhoneInvoice}
            value={this.state.form.addressPhoneInvoice}
            type="tel"
          />
          <div style={validatedStyle(addressPhoneInvoice)}>
            {' '}
            {`validated: ${addressPhoneInvoice}`}
          </div>
        </label>
        <input type="submit" value="Submit" />
      </form>
    )
  }
}
export default UserForm
