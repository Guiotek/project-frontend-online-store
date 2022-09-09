import { Component } from 'react';
import { PropTypes } from 'prop-types';
import { Link } from 'react-router-dom';
import { getProductById } from '../services/api';

export default class ProductDetails extends Component {
  state = {
    product: {},
  };

  async componentDidMount() {
    const { match: { params: { id } } } = this.props;
    const getItem = await getProductById(id);
    this.setState({
      product: {
        name: getItem.title,
        image: getItem.thumbnail,
        price: getItem.price,
      },
    });
  }

  render() {
    const { product } = this.state;
    const { name, price, image } = product;
    return (
      <div>
        <Link to="/cart">
          <button
            data-testid="shopping-cart-button"
            type="button"
          >
            carrinho de compras
          </button>
        </Link>
        <h1 data-testid="product-detail-name">{ name }</h1>
        <img src={ image } alt={ name } data-testid="product-detail-image" />
        <h3 data-testid="product-detail-price">{ price }</h3>
      </div>
    );
  }
}

ProductDetails.propTypes = {
  match: PropTypes.object,
  params: PropTypes.object,
  id: PropTypes.string,
}.isRequired;
