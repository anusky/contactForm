function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

import React, { Component } from 'react';
import PropTypes from 'prop-types';

class Field extends Component {
  constructor(...args) {
    super(...args);

    _defineProperty(this, "state", {
      value: ''
    });
  }

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
    return React.createElement("label", {
      htmlFor: name,
      key: name
    }, titlePosition === 1 && title, type === 'select' && React.createElement("select", {
      className: `input- ${error ? `input__error` : ``}`,
      onChange: this.props.handleChange,
      onBlur: this.props.handleChange,
      value: value || this.state.value,
      name: name
    }, options.map((option, key) => React.createElement("option", {
      key: option,
      value: option
    }, option))), type !== 'select' && React.createElement("input", {
      className: `input__${name} ${error ? `input__error` : ``}`,
      onChange: this.props.handleChange,
      onBlur: this.props.handleOnBlur,
      placeholder: placeholder,
      value: value || this.state.value,
      type: type,
      name: name
    }), titlePosition === -1 && title, validation);
  }

}

_defineProperty(Field, "defaultProps", {
  name: 'exampleName',
  title: 'exampleTitle',
  titlePosition: 1,
  type: 'text',
  error: false,
  validation: React.createElement("div", null),
  handleChange: () => {},
  handleValidate: () => {}
});

export default Field;