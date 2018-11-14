import React from 'react'
import { render } from 'react-dom'
import data from './data/structure'
import { UserForm } from './lib'
import './lib/css/styles.css'
class Prueba extends React.Component {
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
    // const style = {
    //   display: 'flex'
    // }
    // console.log('data ', data)
    return (
      <div>
        <UserForm
          formStructure={data.editFormStructure}
          id="register"
          submit={this.submitData}
        >
          <UserForm.Error className="quepasa">
            <div style={{ color: 'tomato' }}>pete que te pete </div>
          </UserForm.Error>
        </UserForm>
      </div>
    )
  }
}
export default Prueba
