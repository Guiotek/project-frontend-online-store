import { Component } from 'react';
import { Link } from 'react-router-dom';

export default class MainPage extends Component {
  render() {
    return (
      <div>
        <h1
          data-testid="home-initial-message"
        >
          Digite algum termo de pesquisa ou escolha uma categoria.
        </h1>
        <Link to="/cart" data-testid="shopping-cart-button" />
      </div>
    );
  }
}
