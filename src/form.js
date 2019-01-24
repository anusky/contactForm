import React from 'react'
import { render } from 'react-dom'
import data from './data/structure'
import { UserForm } from './lib'

class Form extends React.Component {
  formEdit = {
    firstName: 'somename',
    lastName: 'somelst',
    username: 'user',
    email: 'pepito.palotes@somedomain.com',
    password1: '',
    password2: '',
    country: 'España',
    addressPostalcode: '08004',
    addressCity: '',
    addressPhone: '111222333',
    addressPostalcodeInvoice: '',
    addressCityInvoice: '',
    addressPhoneInvoice: ''
  }
  submitData = formSubmitData => {
    console.log('formSubmitData ', formSubmitData)
  }
  render() {
    const Validation = params => {
      const { valid, message_type } = params
      return !valid ? <div style={{ color: 'tomato' }}>{message_type ? message_type : `$_customInvalidMessage`}</div> : ''
    }
    const SubmitButton = () => (
      <button type="submit" variant="contained" className={`c-submit-button`}>
        $_customSubmit
      </button>
    )

    return (
      <div>
        <UserForm
          formStructure={data.editFormStructure}
          id="register"
          formEdit={this.formEdit}
          formTitle={`$_formTitle`}
          submit={this.submitData}
          Validation={Validation}
          SubmitButton={SubmitButton}
          SubmitButtonText={`Submit`}
        />
      </div>
    )
  }
}
export default Form
