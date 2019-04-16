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
  state = {};

  render() {
    const { name, tagName } = this.props;
    const CustomTag = `${tagName}`;
    return (
      <label className="c-fieldtitle">
        <CustomTag>{name}</CustomTag>
      </label>
    );
  }
}

export default FieldTitle;
FieldTitle.defaultProps = defaultProps;
FieldTitle.PropTypes = propTypes;
