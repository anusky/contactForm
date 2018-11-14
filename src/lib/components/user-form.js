import React, { Component } from 'react'
import { validateType } from '../utils'
import PropTypes from 'prop-types'
import Field from './field'

class UserForm extends Component {
  //TODO dinamizar formulario desde fuera para que entre cualquier input sin nombre estipulado
  static propTypes = {
    formStructure: PropTypes.arrayOf(
      PropTypes.shape({
        name: PropTypes.string.isRequired,
        type: PropTypes.string.isRequired,
        mandatory: PropTypes.bool.isRequired,
        placeholder: PropTypes.string.isRequired,
        validation: PropTypes.arrayOf(
          PropTypes.shape({
            method: PropTypes.string,
            length: PropTypes.number,
            withwho: PropTypes.string,
            withValue: PropTypes.string
          })
        ).isRequired,
        options: PropTypes.arrayOf(PropTypes.string)
      })
    ).isRequired,
    formEdit: PropTypes.object,
    id: PropTypes.string.isRequired,
    submit: PropTypes.func.isRequired
  }
  static defaultProps = {
    formStructure: [],
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
    validationTypes: {}
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
          const { method, withwho } = actualType
          actualType.withValue =
            method === 'comparison' ? this.state.form[withwho] : ''
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
      let stateAux = {
        mandatory: {},
        error: {},
        validated: {},
        validationTypes: {},
        form: {}
      }
      formStructure.forEach(el => {
        const { mandatory, name, validation } = el
        stateAux.mandatory[name] = mandatory
        stateAux.error[name] = false
        stateAux.validated[name] = true
        stateAux.validationTypes[name] = validation
        stateAux.form[name] = ''
      })
      return {
        mandatory: stateAux.mandatory,
        error: stateAux.error,
        validated: stateAux.validated,
        validationTypes: stateAux.validationTypes,
        form: stateAux.form,
        id: props.id
      }
    }
    // No state update necessary
    return null
  }
  componentDidMount(prevProps, prevState) {
    this.handleValidateInputs()
  }

  handleGenericChange = ({ value, name }) => {
    let formAux = this.state.form
    if (name.indexOf('address') !== -1 && this.state.form.copyAddress) {
      formAux = { ...formAux, [`${name}Invoice`]: value }
    }
    formAux = { ...formAux, [name]: value }
    const formError = { ...this.state.error, [name]: false },
      formValidated = { ...this.state.validated, [name]: true }
    this.setState({
      form: formAux,
      error: formError,
      validated: formValidated
    })
  }

  handleChange = (event, { name, type, value } = event.target) => {
    switch (type) {
      case 'checkbox':
        this.handleCopyAddressChange(event)
        break
      default:
        this.handleGenericChange({ value, name })
    }
  }

  handleValidate = (event, { name } = event.target) => {
    console.log('validating name ', name)
    const { [name]: validated } = this.handleValidateUnitaryInput(
      name
    ).validated
    this.setState({
      validated: {
        ...this.state.validated,
        [event.target.id]: validated
      }
    })
  }

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
      stateAux.validated[`address${type}Invoice`] = event.target.checked
        ? stateAux.validated[`address${type}`]
        : ''
    })
    this.setState(stateAux)
  }

  onClickPrueba = event => {
    console.log('caca')
  }

  static Error = props => {
    return props.children
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
          const { name, type, options, placeholder } = el
          return (
            <Field
              key={name}
              error={this.state.error[name]}
              handleChange={this.handleChange}
              handleOnBlur={this.handleValidate}
              value={this.state.form[name]}
              type={type}
              name={name}
              options={options}
              placeholder={placeholder}
              validation={
                <div style={validatedStyle(this.state.validated[name])}>
                  {`validated: ${this.state.validated[name]}`}
                </div>
              }
            >
              <Field.Error validated={this.state.validated[name]}>
                {this.props.children}
              </Field.Error>
            </Field>
          )
        })}
        <button type="submit" variant="contained" className={`buttona`}>
          Submit
        </button>
        <button className={`buttona caca`} onClick={this.onClickPrueba}>
          SubmitPrueba
        </button>
      </form>
    )
  }
}
export default UserForm
