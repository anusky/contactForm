import React from "react";
import { render } from "react-dom";
import { Router, Link } from "@reach/router";
import data from "./data/structure";
import { UserForm } from "./lib";
//https://1vw2r75024.codesandbox.io/
import "./lib/css/styles.css";
class App extends React.Component {
  formEdit = {
    firstName: "anussasasky",
    username: "anusky123",
    email: "pepito.palotes@somedomain.com",
    password1: "",
    password2: "",
    country: "España",
    addressPostalcode: "08004",
    addressCity: "",
    addressPhone: "111222333",
    addressPostalcodeInvoice: "",
    addressCityInvoice: "",
    addressPhoneInvoice: ""
  };
  submitData = formSubmitData => {
    console.log("formSubmitData ", formSubmitData);
  };
  render() {
    const style = {
      display: "flex"
    };
    console.log("data ", data);
    return (
      <div className="App">
        <header>
          <nav>
            <Link to="/">Home</Link> {" -"}
            <Link to="form">Form</Link>
            {" - "}
            <Link to="users/abc">Sally</Link>
          </nav>
        </header>
        {/*<h1>Hello CodeSandbox</h1> */}

        <div style={style} />
        <Router>
          <UserForm
            path="/form"
            formEdit={this.formEdit}
            formStructure={data.editFormStructure}
            id="register"
            submit={this.submitData}
          />
        </Router>
      </div>
    );
  }
}
render(<App />, document.getElementById("root"));
