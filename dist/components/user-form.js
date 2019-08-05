function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

import React, { Component } from "react";
import { validateType } from "../utils";
import PropTypes from "prop-types";
import Field from "./field";

class UserForm extends Component {
  constructor(...args) {
    super(...args);

    _defineProperty(this, "state", {
      id: "",
      addressList: ["City", "Postalcode", "Phone"],
      form: {
        copyAddress: false
      },
      error: {},
      validated: {},
      mandatory: {},
      validationTypes: {}
    });

    _defineProperty(this, "handleValidateUnitaryInput", (element, data = {
      value: this.state.form[element]
    }) => {
      let stateAux = this.state;
      const {
        validationTypes
      } = this.state;
      stateAux.validated[element] = false;
      validationTypes[element].length > 0 ? validationTypes[element].forEach(actualType => {
        const {
          method,
          withwho
        } = actualType;
        actualType.withValue = method === "comparison" ? this.state.form[withwho] : "";
        stateAux.validated[element] = stateAux.validated[element] || validateType(actualType, data);
      }) : stateAux.validated[element] = true;
      return stateAux;
    });

    _defineProperty(this, "handleValidateInputs", () => {
      let stateAux = this.state;

      if (this.props.formEdit) {
        stateAux.form = this.props.formEdit;

        for (let el in stateAux.form) {
          stateAux = this.handleValidateUnitaryInput(el, {
            value: stateAux.form[el]
          });
        }
      }

      this.setState(stateAux);
    });

    _defineProperty(this, "handleGenericChange", ({
      value,
      name
    }) => {
      let formAux = this.state.form;
      formAux = { ...formAux,
        [name]: value
      };
      const formError = { ...this.state.error,
        [name]: false
      },
            formValidated = { ...this.state.validated,
        [name]: true
      };
      this.setState({
        form: formAux,
        error: formError,
        validated: formValidated
      });
    });

    _defineProperty(this, "handleCheckboxChange", ({
      checked,
      name
    }) => {
      let formAux = this.state.form;
      formAux = { ...formAux,
        [name]: checked
      };
      const formError = { ...this.state.error,
        [name]: false
      },
            formValidated = { ...this.state.validated,
        [name]: true
      };
      this.setState({
        form: formAux,
        error: formError,
        validated: formValidated
      });
    });

    _defineProperty(this, "handleRadioChange", ({
      name,
      id
    }) => {
      let formAux = this.state.form;
      formAux = { ...formAux,
        [name]: id
      };
      const formError = { ...this.state.error,
        [name]: false
      },
            formValidated = { ...this.state.validated,
        [name]: true
      };
      this.setState({
        form: formAux,
        error: formError,
        validated: formValidated
      });
    });

    _defineProperty(this, "handleChange", (event, type, {
      name,
      value,
      checked,
      id
    } = event.target) => {
      switch (type) {
        case "checkbox-copy":
          this.handleCopyChange(checked, name);
          break;

        case "checkbox":
          this.handleCheckboxChange({
            checked,
            name
          });
          break;

        case "radio":
          this.handleRadioChange({
            name,
            id
          });
          break;

        default:
          this.handleGenericChange({
            value,
            name
          });
      }
    });

    _defineProperty(this, "handleValidate", (event, {
      name
    } = event.target) => {
      const {
        [name]: validated
      } = this.handleValidateUnitaryInput(name).validated;
      this.setState({
        validated: { ...this.state.validated,
          [event.target.id]: validated
        }
      });
    });

    _defineProperty(this, "handleSubmit", event => {
      event.preventDefault();
      let stateErrorAux = this.state.error,
          sendData = true;

      try {
        for (let el in this.state.form) {
          this.handleValidateUnitaryInput(el);
          stateErrorAux[el] = !this.state.validated[el] || !validateType({
            method: "mandatory"
          }, {
            value: this.state.form[el],
            mandatory: this.state.mandatory[el]
          });
          sendData = sendData && !stateErrorAux[el];
        }
      } catch (err) {
        console.log("Error trying to submit data ", err);
      }

      this.setState({
        error: stateErrorAux
      }, () => {
        if (sendData) {
          this.props.submit(this.state.form);
        }
      });
    });

    _defineProperty(this, "handleCopyChange", (checked, name) => {
      let formAux = this.state.form;
      this.props.formStructure.filter(el => el.copyOf).forEach(el => {
        formAux[el.id] = checked ? formAux[el.copyOf] : "";
      });
      const formError = { ...this.state.error,
        [name]: false
      },
            formValidated = { ...this.state.validated,
        [name]: true
      };
      this.setState({
        form: formAux,
        error: formError,
        validated: formValidated
      });
    });
  }

  static getDerivedStateFromProps(props, state) {
    //we only setup state the first time depending on props data
    if (props.id !== state.id) {
      const {
        formStructure = []
      } = props;
      let stateAux = {
        mandatory: {},
        error: {},
        validated: {},
        validationTypes: {},
        form: {}
      };
      formStructure.forEach(el => {
        const {
          mandatory,
          name,
          validation
        } = el;
        stateAux.mandatory[name] = mandatory;
        stateAux.error[name] = false;
        stateAux.validated[name] = true;
        stateAux.validationTypes[name] = validation;
        stateAux.form[name] = "";
      });
      return {
        mandatory: stateAux.mandatory,
        error: stateAux.error,
        validated: stateAux.validated,
        validationTypes: stateAux.validationTypes,
        form: stateAux.form,
        id: props.id
      };
    } // No state update necessary


    return null;
  }

  componentDidMount(prevProps, prevState) {
    this.handleValidateInputs();
  }

  render() {
    const {
      formStructure = [],
      Validation,
      SubmitButton,
      formTitle
    } = this.props;
    return React.createElement("form", {
      className: "c-userform",
      onSubmit: this.handleSubmit,
      autoComplete: "off"
    }, React.createElement("h3", null, " ", `${formTitle}`, " "), formStructure.map(el => {
      const {
        name,
        id,
        type,
        options,
        placeholder,
        title,
        titlePosition,
        checked,
        tagText,
        tagName
      } = el;
      return React.createElement(Field, {
        key: id,
        id: id,
        checked: checked,
        title: title,
        titlePosition: titlePosition,
        tagName: tagName,
        tagText: tagText,
        error: this.state.error[name],
        handleChange: this.handleChange,
        handleOnBlur: this.handleValidate,
        value: this.state.form[name],
        type: type,
        name: name,
        options: options,
        placeholder: placeholder,
        validation: React.createElement(Validation, {
          valid: this.state.validated[name]
        })
      });
    }), React.createElement(SubmitButton, {
      text: this.props.SubmitButtonText
    }));
  }

}

_defineProperty(UserForm, "propTypes", {
  formStructure: PropTypes.arrayOf(PropTypes.shape({
    name: PropTypes.string.isRequired,
    id: PropTypes.string.isRequired,
    checked: PropTypes.bool,
    copyOf: PropTypes.string,
    title: PropTypes.string,
    titlePosition: PropTypes.number.isRequired,
    type: PropTypes.string.isRequired,
    mandatory: PropTypes.bool.isRequired,
    placeholder: PropTypes.string.isRequired,
    validation: PropTypes.arrayOf(PropTypes.shape({
      method: PropTypes.string,
      length: PropTypes.number,
      withwho: PropTypes.string,
      withValue: PropTypes.string
    })).isRequired
  })).isRequired,
  formEdit: PropTypes.object,
  formTitle: PropTypes.string,
  id: PropTypes.string.isRequired,
  submit: PropTypes.func.isRequired,
  Validation: PropTypes.func,
  SubmitButton: PropTypes.func,
  SubmitButtonText: PropTypes.string
});

_defineProperty(UserForm, "defaultProps", {
  formStructure: [],
  formTitle: "",
  id: "register",
  SubmitButtonText: "enviar",
  submit: () => {},
  SubmitButton: params => {
    let {
      text
    } = params;
    return React.createElement("button", {
      type: "submit",
      variant: "contained",
      className: `c-button`
    }, text);
  },
  Validation: params => {
    let {
      valid
    } = params;
    return React.createElement("div", {
      className: `input--${valid ? `valid` : `invalid`}`
    }, `validated: ${valid}`);
  }
});

export default UserForm;