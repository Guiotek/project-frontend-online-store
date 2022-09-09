import { Component } from 'react';
import ProductDetails from './ProductDetails';

export default class Cart extends Component {
  state = {
    empty: true,
    products: [],
  };

  componentDidMount() {
    const items = localStorage.getItem('products');
    if (items) this.setState({ empty: false });
    this.setState({ products: items });
  }

  render() {
    const { empty, products } = this.state;
    return (
      <div>
        { empty ? (
          <p data-testid="shopping-cart-empty-message"> Seu carrinho está vazio</p>
          : console.log(products))
        }
      );
      </div>
  )}