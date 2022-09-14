import { Component } from 'react';
import { FaStar } from 'react-icons/fa';
import { PropTypes } from 'prop-types';

export default class Review extends Component {
  state = {
    email: '',
    rating: 0,
    text: '',
    verify: false,
    render: false,
    reviews: [],
  };

  componentDidMount() {
    const { id } = this.props;
    let allReviews = JSON.parse(localStorage.getItem(`${id}`));
    if (allReviews === null) {
      allReviews = [];
    }
    this.setState({ render: true, reviews: allReviews });
  }

  handleClickStar = ({ target }) => {
    this.setState({ rating: target.value });
  };

  handleChangeEmail = ({ target }) => {
    this.setState({ email: target.value });
  };

  handleChangeText = ({ target }) => {
    this.setState({ text: target.value });
  };

  handleButtonClick = () => {
    const { id } = this.props;
    const { email, rating, text } = this.state;
    let allReviews = JSON.parse(localStorage.getItem(`${id}`));
    if (allReviews === null) {
      allReviews = [];
    }
    const object = { email, text, rating };
    if (rating === 0 || email === '') {
      this.setState({ verify: true });
    } else {
      this.setState({ verify: false });
      allReviews.push(object);
      localStorage.setItem(`${id}`, JSON.stringify(allReviews));
      this.setState({ render: true, reviews: allReviews });
      this.setState({ email: '', text: '', rating: 0 });
    }
  };

  render() {
    const { rating, hover, verify, render, reviews, email, text } = this.state;
    const numberOfStars = 5;
    const array = [...Array(numberOfStars)];
    return (
      <div>

        <form>
          <input
            type="e-mail"
            data-testid="product-detail-email"
            onChange={ this.handleChangeEmail }
            value={ email }
          />
          {
            [array.map((star, i) => {
              const ratingValue = i + 1;
              return (
                <label key={ ratingValue } htmlFor={ ratingValue }>
                  <input
                    data-testid={ `${ratingValue}-rating` }
                    className="rating"
                    type="radio"
                    name="rating"
                    id={ ratingValue }
                    value={ rating === 0 ? ratingValue : rating }
                    onClick={ this.handleClickStar }
                  />
                  <FaStar
                    color={ ratingValue <= (hover || rating) ? '#ffc107' : 'darkgray' }
                  />
                </label>
              );
            })]
          }
          <br />
          <textarea
            data-testid="product-detail-evaluation"
            rows="10"
            cols="50"
            onChange={ this.handleChangeText }
            value={ text }
          />
          <br />
          { verify && <p data-testid="error-msg">Campos inválidos</p>}
          <button
            type="button"
            data-testid="submit-review-btn"
            onClick={ this.handleButtonClick }
          >
            Avaliar
          </button>
        </form>
        <div>
          { render && reviews.map((review, i) => (
            <div key={ i }>
              <p data-testid="review-card-email">{ review.email }</p>
              <p data-testid="review-card-rating">{ review.rating }</p>
              <p data-testid="review-card-evaluation">{ review.text }</p>
            </div>
          ))}
        </div>
      </div>
    );
  }
}

Review.propTypes = {
  id: PropTypes.string,
}.isRequired;
