import { Component } from 'react';
import { PropTypes } from 'prop-types';
import { Link } from 'react-router-dom';

export default class Card extends Component {
  render() {
    const { image, title, price, id } = this.props;
    return (
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
    );
  }
}

Card.propTypes = {
  image: PropTypes.string,
  title: PropTypes.string,
  price: PropTypes.string,
  id: PropTypes.string,
}.isRequired;
