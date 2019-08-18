import React, { Component } from "react";
import "./css/sidebar.css";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
  NavLink
} from "react-router-dom";
import Cart from "./cart";
import Home from "./home";
import Login from "./login";
import UserProfile from "./UserProfile";
import SearchBar from "./SearchBar";
import Cookies from "universal-cookie";

class NoUserNavbar extends Component {
  constructor(props) {
    super(props);
    this.state = {
      username: ""
    };
  }

  componentDidMount() {
    const cookie = new Cookies();
    this.state.username = cookie.get("username");
  }

  componentDidUpdate() {
    const cookie = new Cookies();
    this.state.username = cookie.get("username");
  }
 

  render() {
    return (
      // <BrowserRouter>
      <div>
        <div class="navholder">
          <div id="sidebar-wrapper">
            <ul className="sidebar-nav">
              <li className="sidebar-brand">
                <a> FashionAlpha </a>
              </li>
              <li>
                <Link to="/home">Home</Link>
              </li>
              <li>
                <Link to="/cart">Cart</Link>
              </li>  
                <li>
                  <Link to="/">Login</Link>
                </li>
            
               
            </ul>
          </div>
        </div> 
      </div>
    );
  }
}

export default NoUserNavbar;
