import React, { Component } from "react";
import "./login.css";
import Home from "./home.jsx";
import Cookies from 'universal-cookie';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
  NavLink
} from "react-router-dom"; 

class Login extends Component {
  validateAccount = () => {};
 
  
  state = {
    users: [],
    user: "",
    hasAccount: false,
    isLoggedIn: false,
    isDefault: false
  };

  
    
  
  render() {
 
     let welcome; 
 
     if (this.props.location.state  != null) {
      if (this.props.location.state.message  == "error") {
       welcome =  
         <div class="alert alert-danger">
            Login failed! Please try again :(
         </div>
      
     } else if(this.props.location.state.message  == "signup") {
      welcome =  
         <div class="alert alert-success">
            Your account has been successfully created! Login in now to browse our wide variety of products!
         </div>
     }
     else if(this.props.location.state.message  == "default"){
       this.setState({
         isDefault: true
       })
     }
    }

    return (
      <div className="main">
        <div>

        <div class="fadeIn first">
          <div class="loginicon"> <img src="https://cdn4.iconfinder.com/data/icons/flat-services-icons/512/consult.png" id="icon" alt="User Icon" /></div>
        </div>
 
          
       <form onSubmit={this.props.checkLogin}>  
       <div className="form-group">
         <input
           type="text"
           className="fadeIn second"
           placeholder="Your Username *"
           name="username"
         />
       </div>
       <div className="form-group">
         <input
           type="text"
           className="fadeIn third"
           placeholder="Your Password *"
           name="password"
         />
       </div>
       <div className="form-group">
         <input type="submit" className="fadeIn fourth" />
       </div>
       {welcome}
       <div className="form-pass"> <Link to ="/signup" > <a>No account? Sign up here! </a> </Link> </div>
     </form>
     
         
        </div>
      </div>
    );
  }
}

export default Login;
