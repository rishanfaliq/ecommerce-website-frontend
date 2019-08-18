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

class SideBar extends Component {
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

  logout = () => {
    const cookie = new Cookies();
    cookie.set("username", "default", { path: "/" });
  };

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
                <Link to="/orders">Orders</Link>
              </li>
              <li>
                <Link to="/profile">Profile</Link>
              </li>

              {this.state.username == "" ? (
                <li>
                  <Link to="/login">Login</Link>
                </li>
              ) : (
                <li>
                  <Link to="/login" onClick={this.logout}>
                    Logout
                  </Link>
                </li>
              )}
            </ul>
          </div>
        </div> 
      </div>
    );
  }
}

export default SideBar;
