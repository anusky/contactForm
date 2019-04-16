function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

import React, { Component } from 'react';
import PropTypes from 'prop-types';
const propTypes = {
  name: PropTypes.string,
  tagName: PropTypes.string
};
const defaultProps = {
  name: 'exampleName',
  tagName: 'h1'
};

class FieldTitle extends Component {
  constructor(...args) {
    super(...args);

    _defineProperty(this, "state", {});
  }

  render() {
    const {
      name,
      tagName
    } = this.props;
    const CustomTag = `${tagName}`;
    return React.createElement("label", {
      className: "c-fieldtitle"
    }, React.createElement(CustomTag, null, name));
  }

}

export default FieldTitle;
FieldTitle.defaultProps = defaultProps;
FieldTitle.PropTypes = propTypes;