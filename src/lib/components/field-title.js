import React, { Component } from 'react';
import PropTypes from 'prop-types';

 class FieldTitle extends Component {
  static defaultProps = {
    name: 'exampleName',
    tagName: 'h1'
  };

   state = {};

   render() {
    const { name, tagName } = this.props;
    const CustomTag = `${tagName}`;
    return (
      <label className="c-fieldradio">
        <CustomTag>{name}</CustomTag>
      </label>
    );
  }
}

 export default FieldTitle;