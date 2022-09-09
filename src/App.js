import { Component } from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import './App.css';
import MainPage from './pages/MainPage';
import Cart from './pages/Cart';
import ProductDetails from './pages/ProductDetails';

export default class App extends Component {
  render() {
    return (
      <BrowserRouter>
        <Switch>
          <Route
            exact
            path="/"
            component={MainPage}
          />
          <Route
            exact
            path="/cart"
            component={Cart}
          />
          <Route
            path="/details/:id"
            // render={(props) => (
            //   <ProductDetails
            //     {...props}
            //   />)}
            component={ProductDetails}
          />
        </Switch>
      </BrowserRouter>
    );
  }
}
