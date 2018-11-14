import React, { Component } from 'react'
import PropTypes from 'prop-types'

class Field extends Component {
  static defaultProps = {
    name: 'firstName',
    type: 'text',
    error: false,
    validation: <div />,
    handleChange: () => {},
    handleValidate: () => {}
  }

  state = {
    value: ''
  }

  /*
    //Usage
    <Field
          error={this.state.error.firstName}
          handleChange={this.handleChange}
          onBlur={this.handleValidate}
          value={this.state.form.firstName}
          type={`text`}
          name={`firstName`}
          validation={
            <div style={validatedStyle(this.state.validated.firstName)}>
              {`validated: ${this.state.validated.firstName}`}
            </div>
          }
        />
   */
  static Error = props => {
    return props.validated ? '' : props.children
  }

  static Prueba = props => {
    return props.children
  }

  render() {
    const {
      name,
      type,
      value,
      validation,
      error,
      options,
      placeholder
    } = this.props
    return (
      <label htmlFor={name} key={name}>
        {name}
        {type === 'select' && (
          <select
            className={`input- ${error ? `input__error` : ``}`}
            onChange={this.props.handleChange}
            onBlur={this.props.handleChange}
            value={value || this.state.value}
            name={name}
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
            className={`input__${name} ${error ? `input__error` : ``}`}
            onChange={this.props.handleChange}
            onBlur={this.props.handleOnBlur}
            placeholder={placeholder}
            value={value || this.state.value}
            type={type}
            name={name}
          />
        )}
        {this.props.children || validation}
      </label>
    )
  }
}

export default Field
