import { Component } from 'react';
import { PropTypes } from 'prop-types';

export default class Categories extends Component {
  render() {
    const { id, name, onClick } = this.props;
    return (
      <label data-testid="category" htmlFor={ id }>
        <input
          type="radio"
          id={ id }
          value={ name }
          name="category"
          onClick={ onClick }
        />
        { name }
        <br />
      </label>
    );
  }
}

Categories.propTypes = {
  name: PropTypes.string,
}.isRequired;
