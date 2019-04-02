function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

import React, { Component } from 'react';
import PropTypes from 'prop-types';

class FieldSelect extends Component {
  constructor(...args) {
    super(...args);

    _defineProperty(this, "state", {
      value: ''
    });
  }

  render() {
    const {
      name,
      error,
      options
    } = this.props;
    return React.createElement("select", {
      className: `input- ${error ? `input__error` : ``}`,
      onChange: this.props.handleChange,
      onBlur: this.props.handleChange,
      value: this.state.value,
      name: name
    }, options.map((option, key) => React.createElement("option", {
      key: option,
      value: option
    }, option)));
  }

}

_defineProperty(FieldSelect, "defaultProps", {
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

export default FieldSelect;