import { Component } from 'react';
import { Link } from 'react-router-dom';
import { getProductsFromCategoryAndQuery, getCategories } from '../services/api';
import Card from '../components/Card';
import Categories from '../components/Categories';
import './MainPage.css';

export default class MainPage extends Component {
  state = {
    search: '',
    searchedProduct: [],
    update: false,
    categories: [],
  };

  async componentDidMount() {
    const fetchCategories = await getCategories();
    this.setState({ categories: fetchCategories });
  }

  onInputChange = ({ target }) => {
    const { name, value } = target;
    this.setState({
      [name]: value,
    });
  };

  searchButton = async () => {
    const { search } = this.state;
    if (search === '') {
      return null;
    }
    const fetchedProduct = (
      await getProductsFromCategoryAndQuery(undefined, search));
    this.setState({
      searchedProduct: fetchedProduct.results,
      update: true,
    });
  };

  checkRadio = async ({ target }) => {
    const fetchedProduct = await getProductsFromCategoryAndQuery(target.id);
    this.setState({
      searchedProduct: fetchedProduct.results,
      update: true,
    });
  };

  render() {
    const { searchedProduct, update, categories } = this.state;
    return (
      <div>
        <header id="header">
          <h1
            data-testid="home-initial-message"
            className="search-title"
          >
            Digite algum termo de pesquisa ou escolha uma categoria.
          </h1>
          <Link to="/cart" data-testid="shopping-cart-button" />
          <label htmlFor="search-input" id="search-label">
            <input
              data-testid="query-input"
              placeholder="Pesquisar Produto"
              className="search-input"
              id="search-input"
              type="text"
              name="search"
              onInput={ this.onInputChange }
            />
            <button
              type="button"
              id="search-button"
              className="search-input"
              data-testid="query-button"
              onClick={ this.searchButton }
            >
              Pesquisar
            </button>
          </label>
        </header>
        <div id="main">
          <aside id="aside">
            {
              categories.map((category) => (<Categories
                key={ category.id }
                id={ category.id }
                name={ category.name }
                onClick={ this.checkRadio }
              />))
            }
          </aside>
          <div id="products">
            { searchedProduct.length === 0 && <p>Nenhum produto foi encontrado</p> }
            {
              update && searchedProduct.map((product) => (<Card
                key={ product.id }
                image={ product.thumbnail }
                title={ product.title }
                price={ product.price }
                id={ product.id }
              />))
            }
          </div>
        </div>
      </div>
    );
  }
}
