import React, { Component } from "react";
import "./Review.css";
import Cookies from "universal-cookie";

class Review extends Component {
  state = {
    showResults: false,
    username: "",
    isAdded: false
  };

  componentDidMount() {
    const cookies = new Cookies();
    const username = cookies.get("username");
    this.setState({
      username: username
    });

     
    fetch(`http://localhost:8080/login/${username}`)
    .then(function(response) {
      if (!response.ok) {
          throw Error(response.statusText);
        }
          return response
      })
      .then(res => res.json())
      .then(json => {
        this.setState({
          img: json.profileimg 
        }) 
      })
      
  }

  saveReview = e => {
    e.preventDefault();
    const review = e.target.elements.review.value;
    this.setState({
      isAdded: true
    });

    var tempDate = new Date();
    var date =
      tempDate.getFullYear() +
      "-" +
      (tempDate.getMonth() + 1) +
      "-" +
      tempDate.getDate() +
      " " +
      tempDate.getHours() +
      ":" +
      tempDate.getMinutes() +
      ":" +
      tempDate.getSeconds();
    const currDate = date;

    fetch(`http://localhost:8080/reviews`, {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        review: review,
        date: currDate,
        user: {
          username: this.state.username
        },
        prod_id: {
          pid: this.props.productId
        }
      })
    });
  };

  showResult = e => {
    e.preventDefault();
    if (this.state.showResults == false) {
      this.setState({
        showResults: true
      });
    } else {
      this.setState({
        showResults: false
      });
    }
  };
  render() {
    let alert;

    if (this.state.isAdded) {
      alert = <div class="alert alert-info">Your review has been placed!</div>;
    }
    return (
      <div class="container">
        <div class="row">
          <div class="col-md-6">
            <div class="well well-sm">
              <button class="btn btn-outline-dark" onClick={this.showResult}>
                Leave a Review? Click Here!
              </button>

              {this.state.showResults ? (
                <div class="review">
                  <form onSubmit={this.saveReview}>
                    <div class="col-md-2">
                      <img
                        src={this.state.img}
                        class="img img-rounded img-fluid"
                      />
                      <p class="text-secondary text-center">
                        {this.state.username}
                      </p>
                    </div>
                    <input
                      class="texts"
                      type="text"
                      name="review"
                      placeholder="Leave a review"
                    />
                    {alert}
                    <button type="submit" class="btn">
                      {" "}
                      Submit
                    </button>
                  </form>
                </div>
              ) : null}
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default Review;
