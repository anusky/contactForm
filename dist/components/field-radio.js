function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

import React, { Component } from 'react';
import PropTypes from 'prop-types';

class FieldRadio extends Component {
  constructor(...args) {
    super(...args);

    _defineProperty(this, "state", {});
  }

  render() {
    const {
      name,
      title,
      error,
      id,
      checked
    } = this.props;
    return React.createElement("label", {
      className: "c-fieldradio"
    }, name, React.createElement("input", {
      className: `input__${name} ${error ? `input__error` : ``}`,
      id: id,
      onChange: this.props.handleChange,
      onBlur: this.props.handleOnBlur,
      value: this.props.name,
      checked: checked,
      type: "radio",
      name: title
    }));
  }

}

_defineProperty(FieldRadio, "defaultProps", {
  name: 'exampleName',
  title: 'exampleTitle',
  titlePosition: 1,
  type: 'select',
  error: false,
  options: [],
  validation: React.createElement("div", null),
  handleChange: () => {},
  handleValidate: () => {}
});

export default FieldRadio;