import { Component } from 'react';
import { PropTypes } from 'prop-types';

export default class CartItem extends Component {
  state = {
    quantity: 1,
  };

  handleClickIncrease = () => {
    const { quantity } = this.state;
    this.setState({
      quantity: quantity + 1,
    });
  };

  handleClickDecrease = () => {
    const { quantity } = this.state;
    if (quantity >= 2) {
      this.setState({
        quantity: quantity - 1,
      });
    }
  };

  handleClickDelete = (title) => {
    const { updatePage } = this.props;
    const a = localStorage.getItem('products');
    const items = JSON.parse(a);
    const updatedItems = items.filter((item) => item.title !== title);
    localStorage.setItem('products', JSON.stringify(updatedItems));
    updatePage();
  };

  render() {
    const { image, title, price } = this.props;
    const { quantity } = this.state;
    return (
      <div>
        <button
          type="button"
          data-testid="remove-product"
          onClick={ () => this.handleClickDelete(title) }

        >
          X
        </button>
        <img src={ image } alt={ title } />
        <p data-testid="shopping-cart-product-name">{ title }</p>
        <p>{ price }</p>
        <p data-testid="shopping-cart-product-quantity">{ quantity }</p>
        <button
          type="button"
          data-testid="product-increase-quantity"
          onClick={ this.handleClickIncrease }
        >
          +
        </button>
        <button
          type="button"
          data-testid="product-decrease-quantity"
          onClick={ this.handleClickDecrease }
        >
          -
        </button>

      </div>
    );
  }
}

CartItem.propTypes = {
  image: PropTypes.string,
  title: PropTypes.string,
  price: PropTypes.string,
  id: PropTypes.string,
}.isRequired;
