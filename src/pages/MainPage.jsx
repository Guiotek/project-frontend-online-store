import { Component } from 'react';
import { Link } from 'react-router-dom';
import { getProductsFromCategoryAndQuery, getCategories } from '../services/api';
import Card from '../components/Card';
import Categories from '../components/Categories';

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
    // console.log(searchedProduct);
    const fetchedProduct = (
      await getProductsFromCategoryAndQuery(undefined, search));
    // console.log(fetchedProduct.results);
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
        <h1
          data-testid="home-initial-message"
        >
          Digite algum termo de pesquisa ou escolha uma categoria.
        </h1>
        <Link to="/cart" data-testid="shopping-cart-button" />
        <input
          data-testid="query-input"
          placeholder="Pesquisar Produto"
          type="text"
          name="search"
          onInput={ this.onInputChange }
        />
        <button
          type="button"
          data-testid="query-button"
          onClick={ this.searchButton }
        >
          Pesquisar
        </button>
        <aside>
          {
            categories.map((category) => (<Categories
              key={ category.id }
              id={ category.id }
              name={ category.name }
              onClick={ this.checkRadio }
            />))
          }
        </aside>
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
    );
  }
}
