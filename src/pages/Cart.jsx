import { Component } from 'react';

export default class Cart extends Component {
  state = {
    empty: true,
    products: [],
    quantity: 1,
  };

  componentDidMount() {
    const items = JSON.parse(localStorage.getItem('products'));
    if (items) this.setState({ empty: false });
    this.setState({ products: items });
  }

  render() {
    const { empty, products, quantity } = this.state;
    return (
      <div>
        { empty ? (
          <p data-testid="shopping-cart-empty-message"> Seu carrinho está vazio</p>)
          : products.map((product) => (
            <div key={ product.title }>
              <img src={ product.image } alt={ product.title } />
              <p data-testid="shopping-cart-product-name">{ product.title }</p>
              <p>{ product.price }</p>
              <p data-testid="shopping-cart-product-quantity">{ quantity }</p>
            </div>))}
      </div>
    );
  }
}
