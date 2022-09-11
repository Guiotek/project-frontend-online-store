import { Component } from 'react';
import { PropTypes } from 'prop-types';
import { Link } from 'react-router-dom';

export default class Card extends Component {
  addToLocalStorage = (image, title, price) => {
    let products = [];
    const storage = localStorage.getItem('products');
    if (storage) {
      products = (JSON.parse(localStorage.getItem('products')));
    }
    products.push({ image, title, price });
    localStorage.setItem('products', JSON.stringify(products));
  };

  render() {
    const { image, title, price, id } = this.props;
    return (
      <div>
        <Link
          to={ `/details/${id}` }
          data-testid="product-detail-link"
        >
          <div data-testid="product">
            <img
              src={ image }
              alt={ title }
            />
            <p>{ title }</p>
            <p>{ price }</p>
          </div>
        </Link>
        <button
          type="button"
          data-testid="product-add-to-cart"
          onClick={ () => this.addToLocalStorage(image, title, price) }
        >
          Adicionar ao carrinho
        </button>

      </div>
    );
  }
}

Card.propTypes = {
  image: PropTypes.string,
  title: PropTypes.string,
  price: PropTypes.string,
  id: PropTypes.string,
}.isRequired;
