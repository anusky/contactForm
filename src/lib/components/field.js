import React, { Component } from 'react';
import PropTypes from 'prop-types';

class Field extends Component {
  static defaultProps = {
    name: 'exampleName',
    title: 'exampleTitle',
    titlePosition: 1,
    type: 'text',
    error: false,
    validation: <div />,
    handleChange: () => {},
    handleValidate: () => {}
  };

  state = {
    value: ''
  };

  render() {
    const {
      name,
      title,
      titlePosition,
      type,
      value,
      error,
      options,
      placeholder,
      validation
    } = this.props;
    return (
      <label htmlFor={name} key={name}>
        {titlePosition === 1 && title}
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
        {titlePosition === -1 && title}
        {validation}
      </label>
    );
  }
}

export default Field;
