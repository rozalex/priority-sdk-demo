import React, { Component } from 'react';
import '../misc/App.css';

import LoginService from './loginService';
import FormService from './formService';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      status: 'Press login button to login',
      imageClass: 'flow-image',
      orders: null
    }
  }

  performLogin() {
    LoginService.login().then((login) => {
      console.log(" <= ", login);

      this.setState({
        status: "You're successfully logged in! Have fun using this awsome SDK",
      });

      this.getOrder();

    }).catch(() => {
      this.setState({
        status: "Error logging in."
      });
    });
  }

  getOrder() {
    const resultPromise = FormService.getOrder("SO18000002");
    resultPromise.then((response) => {
      this.setState({
        orders: response.ORDERS
      });

      // this.getSummary();
      this.getItems();
    }).then(() => {
      FormService.endForm();
    })
  }

  getSummary() {
    const resultPromise = FormService.getSummaryFile();
    resultPromise.then((file) =>{
      window.open(file);
    });

  }

  getItems() {
    FormService.getOrderItems();
  }

  renderOrders() {
    const { orders } = this.state;
    if (!orders) {
      return null;
    }

    return (
      <div>Order from Priority: {orders[1].CDES}</div>
    )
  }

  changeImage() {
    const {imageClass} = this.state;
    if (imageClass === 'flow-image') {
      this.setState({imageClass: 'usecase-image'});
    } else {
      this.setState({imageClass: 'flow-image'});
    }
  }

  render() {
    return (
      <div className="App">
        <header className="App-header">
          <img
            src="https://erpil.co.il/wp-content/uploads/2014/12/Priority_SoftWare_Front.jpg"
            alt="logo"
          />
          <h1 className="App-title">Priority SDK Demo</h1>
        </header>
        <p className="App-intro">Getting Started with priority SDK</p>
        <div>{this.state.status}</div>
        <button onClick={() => this.performLogin()}>Login</button>

        <div className={this.state.imageClass} onClick={() => {this.changeImage()}}/>
        <div className="orders">
          {this.renderOrders()}
        </div>
        <div />
      </div>
    );
  }
}

export default App;
