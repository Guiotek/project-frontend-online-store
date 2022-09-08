import { Component } from 'react';
import { PropTypes } from 'prop-types';

export default class Card extends Component {
  render() {
    const { image, title, price } = this.props;
    return (
      <div data-testid="product">
        <img
          src={ image }
          alt={ title }
        />
        <p>{ title }</p>
        <p>{ price }</p>
      </div>
    );
  }
}

Card.propTypes = {
  image: PropTypes.string,
  title: PropTypes.string,
  price: PropTypes.string,
}.isRequired;
