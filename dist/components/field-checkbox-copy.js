function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

import React, { Component } from 'react';
import PropTypes from 'prop-types';

class FieldCheckboxCopy extends Component {
  constructor(...args) {
    super(...args);

    _defineProperty(this, "state", {
      value: false
    });
  }

  // handleChange = (event) => {
  //   this.setState({value: event.target.checked})
  // }
  render() {
    const {
      name,
      error,
      placeholder,
      value
    } = this.props;
    return React.createElement("input", {
      className: `input__${name} ${error ? `input__error` : ``}`,
      onChange: this.props.handleChange,
      onBlur: this.props.handleOnBlur,
      placeholder: placeholder,
      value: value || this.state.value // checked={value || this.state.value}
      ,
      type: "checkbox",
      name: name
    });
  }

}

_defineProperty(FieldCheckboxCopy, "defaultProps", {
  name: 'exampleName',
  title: 'exampleTitle',
  titlePosition: 1,
  type: 'checkbox-copy',
  error: false,
  options: [],
  validation: React.createElement("div", null),
  handleChange: () => {},
  handleValidate: () => {}
});

export default FieldCheckboxCopy;