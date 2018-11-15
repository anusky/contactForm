import React, { Component } from 'react'
import PropTypes from 'prop-types'

class Field extends Component {
  static defaultProps = {
    name: 'exampleInput',
    type: 'text',
    error: false,
    validation: <div />,
    handleChange: () => {},
    handleValidate: () => {}
  }

  state = {
    value: ''
  }

  render() {
    const {
      name,
      type,
      value,
      error,
      options,
      placeholder,
      validation
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
        {validation}
      </label>
    )
  }
}

export default Field