import React, { Component } from 'react';
import PropTypes from 'prop-types';

class Field extends Component {
  static defaultProps = {
    name: 'firstName',
    type: 'text',
    error: false,
    validation: <div />,
    handleChange: () => {},
    handleValidate: () => {}
  };

  state = {
    value: ''
  };

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

  render() {
    const { name, type, value, validation, error, options } = this.props;
    return (
      // <label>
      //   <input
      //     className={`input- ${error ? `input__error` : ``}`}
      //     onChange={this.props.handleChange}
      //     onBlur={this.props.handleValidate}
      //     value={value || this.state.value}
      //     type={type}
      //     name={name}
      //   />
      //   {validation}
      // </label>

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
            className={`input- ${error ? `input__error` : ``}`}
            onChange={this.props.handleChange}
            onBlur={this.props.handleOnBlur}
            value={value || this.state.value}
            type={type}
            name={name}
          />
        )}
        {validation}
      </label>
    );
  }
}

export default Field;
