import React, { Component } from 'react';
import PropTypes from 'prop-types';

class FieldCheckboxCopy extends Component {
  static defaultProps = {
    name: 'exampleName',
    title: 'exampleTitle',
    titlePosition: 1,
    type: 'checkbox-copy',
    error: false,
    options: [],
    validation: <div />,
    handleChange: () => {},
    handleValidate: () => {}
  };

  state = {
    value: false
  };

  // handleChange = (event) => {
  //   this.setState({value: event.target.checked})
  // }

  render() {
    const { name, error, placeholder, value } = this.props;

    return (
      <input
        className={`input__${name} ${error ? `input__error` : ``}`}
        onChange={this.props.handleChange}
        onBlur={this.props.handleOnBlur}
        placeholder={placeholder}
        value={value || this.state.value}
        checked={value || this.state.value}
        type="checkbox"
        name={name}
      />
    );
  }
}

export default FieldCheckboxCopy;
