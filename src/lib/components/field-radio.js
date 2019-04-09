import React, { Component } from 'react';
import PropTypes from 'prop-types';

class FieldRadio extends Component {
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

  state = {};

  render() {
    const { name, title, error, id, checked } = this.props;
    return (
      <label className="c-fieldradio">
        {name}
        <input
          className={`input__${name} ${error ? `input__error` : ``}`}
          id={id}
          onChange={this.props.handleChange}
          onBlur={this.props.handleOnBlur}
          value={this.props.name}
          checked={checked}
          type="radio"
          name={title}
        />
      </label>
    );
  }
}

export default FieldRadio;
