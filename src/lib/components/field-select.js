import React, { Component } from 'react';
import PropTypes from 'prop-types';

class FieldSelect extends Component {
  static defaultProps = {
    name: 'exampleName',
    title: 'exampleTitle',
    titlePosition: 1,
    type: 'select',
    error: false,
    options: [],
    validation: <div />,
    handleChange: () => {},
    handleValidate: () => {}
  };

  state = {
    value: ''
  };

  render() {
    const { name, error, options } = this.props;

    return (
      <select
        className={`input- ${error ? `input__error` : ``}`}
        onChange={this.props.handleChange}
        onBlur={this.props.handleChange}
        value={this.state.value}
        name={name}
      >
        {options.map((option, key) => (
          <option key={option} value={option}>
            {option}
          </option>
        ))}
      </select>
    );
  }
}

export default FieldSelect;
