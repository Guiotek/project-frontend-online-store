import { Component } from 'react';
import { PropTypes } from 'prop-types';
import { Link } from 'react-router-dom';
import { getProductById } from '../services/api';
import Review from '../components/Review';

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

  addToLocalStorage = (image, title, price) => {
    let products = [];
    const storage = localStorage.getItem('products');
    if (storage) {
      products = (JSON.parse(localStorage.getItem('products')));
    }
    products.push({ image, title, price, quantity: 1 });
    localStorage.setItem('products', JSON.stringify(products));
  };

  render() {
    const { match: { params: { id } } } = this.props;
    const { product } = this.state;
    const { name, price, image } = product;
    return (
      <div>
        <h1 data-testid="product-detail-name">{ name }</h1>
        <img src={ image } alt={ name } data-testid="product-detail-image" />
        <h3 data-testid="product-detail-price">{ price }</h3>
        <Link to="/cart">
          <button
            data-testid="shopping-cart-button"
            type="button"
          >
            carrinho de compras
          </button>
        </Link>
        <button
          data-testid="product-detail-add-to-cart"
          type="button"
          onClick={ () => this.addToLocalStorage(image, name, price) }
        >
          Adicionar ao carrinho
        </button>
        <Review id={ id } />
      </div>
    );
  }
}

ProductDetails.propTypes = {
  match: PropTypes.object,
  params: PropTypes.object,
  id: PropTypes.string,
}.isRequired;
