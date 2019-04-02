function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

import React, { Component } from 'react';
import PropTypes from 'prop-types';
import FieldSelect from './field-select';
import FieldRadio from './field-radio';
import FieldCheckboxCopy from './field-checkbox-copy';

class Field extends Component {
  constructor(...args) {
    super(...args);

    _defineProperty(this, "state", {
      value: ''
    });

    _defineProperty(this, "handleChange", event => {
      this.props.handleChange(event, this.props.type);
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
    let InputField;

    switch (this.props.type) {
      case 'radio':
        InputField = options.map(el => React.createElement(FieldRadio, {
          key: el.id,
          handleChange: this.handleChange,
          checked: el.checked,
          name: el.title,
          title: name,
          id: el.id,
          error: error
        }));
        break;

      case 'select':
        InputField = React.createElement(FieldSelect, {
          handleChange: this.handleChange,
          options: options,
          name: name,
          error: error
        });
        break;

      case 'checkbox-copy':
        InputField = React.createElement(FieldCheckboxCopy, {
          handleChange: this.handleChange,
          name: name,
          error: error
        });
        break;

      default:
        InputField = React.createElement("input", {
          className: `input__${name} ${error ? `input__error` : ``}`,
          onChange: this.handleChange,
          onBlur: this.props.handleOnBlur,
          placeholder: placeholder,
          value: value || this.state.value,
          checked: value || this.state.value,
          type: type,
          name: name
        });
    }

    return React.createElement("label", {
      htmlFor: name,
      key: name
    }, titlePosition === 1 && title, InputField, titlePosition === -1 && title, validation);
  }

}

_defineProperty(Field, "defaultProps", {
  name: 'exampleName',
  id: 'exampleId',
  checked: false,
  title: 'exampleTitle',
  titlePosition: 1,
  type: 'text',
  error: false,
  validation: React.createElement("div", null),
  handleChange: () => {},
  handleValidate: () => {}
});

export default Field;