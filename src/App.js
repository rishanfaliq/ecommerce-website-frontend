import React, { Component } from "react";
import "./App.css";
import "./navbar.css";
import NavBar from "./navbar";
import Product from "./product";
import Home from "./home";
import Cookies from 'universal-cookie';
import Welcome from "./welcome";
import SideBar from "./sidebar";
import Checkout from "./Checkout"
import Login from "./login";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Detail from "./detailed";
import Cart from "./cart";
import { withRouter } from "react-router-dom";
import UserProfile from "./UserProfile";
import Orders from "./Orders"
import AdminHome from "./AdminHome";
import AdminNavBar from "./AdminNavBar";
import HighHome from "./HighHome";
import HighHomeAdmin from "./HighHomeAdmin";
import Profile from "./Profile";
import Signup from "./Signup";
import NoUserNavbar from "./NoUserNavbar";



class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
       products: [],
       isUser: false };
  }

  componentDidMount() {
    fetch("https://jsonplaceholder.typicode.com/users")
      .then(data => data.json())
      .then(json => {
        this.setState({
          products: json
        });
      });
      
  }

 
  render() {
    
    return (
      <div>
        <Switch>
          <Route path="/"  exact  render={props => <Login {...props} checkLogin={this.getUser} />} />
          
        </Switch>
      </div>
    );
  }
}

export default withRouter(App);
