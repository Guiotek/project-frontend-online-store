import { Component } from 'react';
import CartItem from '../components/CartItem';

export default class Cart extends Component {
  state = {
    empty: true,
    products: [],
  };

  componentDidMount() {
    const items = JSON.parse(localStorage.getItem('products'));
    if (items) this.setState({ empty: false });
    this.setState({ products: items });
  }

  updatePage = () => {
    const product = JSON.parse(localStorage.getItem('products'));
    if (product) this.setState({ empty: false });
    this.setState({ products: product });
  };

  render() {
    const { empty, products } = this.state;
    return (
      <div>
        { empty ? (
          <p data-testid="shopping-cart-empty-message"> Seu carrinho está vazio</p>)
          : products.map((product, i) => (
            <CartItem
              key={ i }
              title={ product.title }
              image={ product.image }
              price={ product.price }
              updatePage={ this.updatePage }
            />
          ))}
      </div>
    );
  }
}
