import React, { Component } from "react";
import SearchBar from "./SearchBar";
import Home from "./home";
import AdminHome from "./AdminHome";

class HighHomeAdmin extends Component {
  constructor(props) {
    super(props);
    this.handleChange = this.handleChange.bind(this);
  }
  state = {
    filteredList: [],
    originalList: []
  };

  componentDidMount() {
    fetch("http://localhost:8080/products")
      .then(res => res.json())
      .then(json => {
        this.setState({
          originalList: json,
          filteredList: json
        });
      });
  }

  handleChange(e) {
    let currentList = [];
    let newList = [];

    if (e.target.value !== "") {
      currentList = this.state.originalList;
      newList = currentList.filter(item => {
        const lc = item.productName.toLowerCase();
        const filter = e.target.value.toLowerCase();
        return lc.includes(filter);
      });
    } else {
      newList = this.state.originalList;
    }
    this.setState({
      filteredList: newList
    });
  }

  render() {
    return (
      <div>
        <SearchBar handleChange={this.handleChange} />
        <AdminHome filteredList={this.state.filteredList} />
      </div>
    );
  }
}

export default HighHomeAdmin;
