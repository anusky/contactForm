import React, { Component } from 'react';
import PropTypes from 'prop-types';
import FieldSelect from './field-select';
import FieldRadio from './field-radio';
import FieldCheckboxCopy from './field-checkbox-copy';
import FieldTitle from './field-title';

class Field extends Component {
  static defaultProps = {
    name: 'exampleName',
    id: 'exampleId',
    checked: false,
    title: '',
    titlePosition: 1,
    type: 'text',
    error: false,
    validation: <div />,
    tagName: 'h1',
    handleChange: () => {},
    handleValidate: () => {}
  };

  state = {
    value: ''
  };

  handleChange = event => {
    this.props.handleChange(event, this.props.type);
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
      validation,
      tagName,
      tagText
    } = this.props;
    let InputField;
    switch (this.props.type) {
      case 'title':
        InputField = <FieldTitle name={tagText} tagName={tagName} />;
        break;
      case 'radio':
        InputField = options.map(el => (
          <FieldRadio
            key={el.id}
            handleChange={this.handleChange}
            checked={el.id === value}
            name={el.title}
            title={name}
            id={el.id}
            error={error}
          />
        ));
        break;
      case 'select':
        InputField = (
          <FieldSelect
            handleChange={this.handleChange}
            options={options}
            name={name}
            error={error}
          />
        );
        break;
      case 'checkbox-copy':
        InputField = (
          <FieldCheckboxCopy
            handleChange={this.handleChange}
            name={name}
            error={error}
          />
        );
        break;
      default:
        InputField = (
          <input
            className={`input__${name} ${error ? `input__error` : ``}`}
            onChange={this.handleChange}
            onBlur={this.props.handleOnBlur}
            placeholder={placeholder}
            value={value || this.state.value}
            checked={value || this.state.value}
            type={type}
            name={name}
          />
        );
    }
    return (
      <label htmlFor={name} key={name}>
        {titlePosition === 1 && title}
        {InputField}
        {titlePosition === -1 && title}
        {validation}
      </label>
    );
  }
}

export default Field;