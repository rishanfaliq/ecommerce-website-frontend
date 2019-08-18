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
import Cookies from "universal-cookie";

class SideBar extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  logout = () => {
    const cookie = new Cookies();
    cookie.set("username", "default");
  }

  render() {
    return (
      <div>
        <div>
          <div id="sidebar-wrapper">
            <ul className="sidebar-nav">
              <li className="sidebar-brand">
                <a href="#">FashionAlpha</a>
              </li>
              <li>
                <Link to="/adminhome">Home</Link>
              </li>
              <li>
                <Link to="/profile">Profile</Link>
              </li>
              <li>
                <Link to="/gin">Login</Link>
              </li>
              <li>
                <Link
                  to="/login"
                  onClick={this.logout}
                >
                  Logout
                </Link>
              </li>
            </ul>
          </div>
        </div>
      </div>
    );
  }
}

export default SideBar;
