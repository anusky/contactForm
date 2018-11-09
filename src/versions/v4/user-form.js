//First version with proptypes and unit test configured
import React, { Component } from 'react'
import { validateType, capitalize } from './utils'
import PropTypes from 'prop-types'

class UserForm extends Component {
  //TODO dinamizar formulario desde fuera para que entre cualquier input sin nombre estipulado
  static propTypes = {
    formStructure: PropTypes.arrayOf(
      PropTypes.shape({
        name: PropTypes.string.isRequired,
        type: PropTypes.string.isRequired,
        mandatory: PropTypes.bool.isRequired,
        options: PropTypes.arrayOf(PropTypes.string)
      })
    ).isRequired,
    formEdit: PropTypes.object,
    id: PropTypes.string.isRequired,
    submit: PropTypes.func.isRequired
  }
  static defaultProps = {
    formStructure: [],
    formEdit: {},
    id: 'register',
    submit: () => {}
  }
  state = {
    id: '',
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
    error: {},
    validated: {},
    mandatory: {},
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
    languages: ['Español', 'English']
  }

  handleValidateUnitaryInput = (
    element,
    data = { value: this.state.form[element] }
  ) => {
    let stateAux = this.state
    const { validationTypes } = this.state
    stateAux.validated[element] = false

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
  static getDerivedStateFromProps(props, state) {
    //we only setup state the first time depending on props data
    if (props.id !== state.id) {
      const { formStructure = [] } = props
      let stateAux = { mandatory: {}, error: {}, validated: {} }
      formStructure.forEach(el => {
        const { mandatory, name } = el
        stateAux.mandatory[name] = mandatory
        stateAux.error[name] = false
        stateAux.validated[name] = true
      })
      return {
        mandatory: stateAux.mandatory,
        error: stateAux.error,
        validated: stateAux.validated,
        id: props.id
      }
    }
    // No state update necessary
    return null
  }
  componentDidMount(prevProps, prevState) {
    this.handleValidateInputs()
  }

  handleGenericChange = formName => event => {
    let formAux = this.state.form
    if (formName.indexOf('address') !== -1 && this.state.form.copyAddress) {
      formAux = { ...formAux, [`${formName}Invoice`]: event.target.value }
    }
    formAux = { ...formAux, [formName]: event.target.value }
    const formError = { ...this.state.error, [formName]: false },
      formValidated = { ...this.state.validated, [formName]: true }
    this.setState({
      form: formAux,
      error: formError,
      validated: formValidated
    })
  }

  handleFirstNameChange = this.handleGenericChange('firstName', this.state.form)
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
    let stateErrorAux = this.state.error,
      sendData = true
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
      sendData = sendData && !stateErrorAux[el]
    }
    this.setState({ error: stateErrorAux }, () => {
      if (sendData) {
        this.props.submit(this.state.form)
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

  render() {
    const validatedStyle = valid => ({
      color: valid ? 'green' : 'red',
      display: valid ? 'none' : 'block'
    })
    const { formStructure = [] } = this.props
    return (
      <form className="c-userform" onSubmit={this.handleSubmit}>
        <h3> automatized </h3>
        {formStructure.map(el => {
          const { name, type, options } = el
          return (
            <label htmlFor={name} key={name}>
              {name}
              {type === 'select' && (
                <select
                  className={`input- ${
                    this.state.error[name] ? `input__error` : ``
                  }`}
                  onChange={this[`handle${capitalize(name)}Change`]}
                  onBlur={this[`handle${capitalize(name)}Change`]}
                  value={this.state.form[name]}
                >
                  {options.map((option, key) => (
                    <option key={option} value={option}>
                      {option}
                    </option>
                  ))}
                </select>
              )}
              {type !== 'select' && (
                <input
                  className={`input- ${
                    this.state.error[name] ? `input__error` : ``
                  }`}
                  onChange={this[`handle${capitalize(name)}Change`]}
                  onBlur={this[`handleValidate${capitalize(name)}`]}
                  value={this.state.form[name]}
                  type={type}
                />
              )}
              <div style={validatedStyle(this.state.validated[name])}>
                {' '}
                {`validated: ${this.state.validated[name]}`}
              </div>
            </label>
          )
        })}
        <input type="submit" value="Submit" />
      </form>
    )
  }
}
export default UserForm
