import { Component } from 'react';
import { PropTypes } from 'prop-types';

export default class Checkout extends Component {
  state = {
    empty: true,
    validation: false,
    products: [],
    totalprice: 0,
    name: '',
    email: '',
    cpf: '',
    telefone: '',
    cep: '',
    endereco: '',
    pagamento: '',
  };

  componentDidMount() {
    const products = JSON.parse(localStorage.getItem('products'));
    if (products) this.setState({ empty: false });
    this.setState({ products });
    let total = 0;
    if (products) {
      products.forEach((product) => { total += (product.quantity * product.price); });
      this.setState({ totalprice: total.toFixed(2) });
    }
  }

  onInputChage = ({ target }) => {
    const { name, value } = target;
    this.setState({ [name]: value });
  };

  validate = () => {
    const { history } = this.props;
    const { name, email, cpf, telefone, cep, endereco, pagamento } = this.state;
    if (!name || !email || !cpf || !telefone || !cep || !endereco || !pagamento) {
      this.setState({ validation: true });
    } else {
      localStorage.removeItem('products');
      history.push('/');
    }
  };

  render() {
    const { products, totalprice, validation, empty } = this.state;
    const { name, email, cpf, telefone, cep, endereco } = this.state;
    return (
      <div>
        <h3> Finalize sua compra!</h3>
        { empty
          ? <p>Seu carrinho está vazio!</p>
          : (
            <div>
              <div>
                {
                  products.map((product, i) => (
                    <div key={ i }>
                      <img src={ product.image } alt={ product.title } />
                      <p>{ product.title }</p>
                      <p>{ product.price }</p>
                      <p>{ product.quantity }</p>
                      <p>
                        {`Total: ${(product.price * product.quantity).toFixed(2)}`}
                      </p>
                    </div>
                  ))
                }
                <h3>{ `Total: ${totalprice}`}</h3>
              </div>
              <form>
                <label htmlFor="name">
                  Nome completo:
                  <input
                    type="text"
                    id="name"
                    name="name"
                    data-testid="checkout-fullname"
                    value={ name }
                    onChange={ this.onInputChage }
                  />
                </label>
                <br />
                <label htmlFor="email">
                  E-mail:
                  <input
                    type="text"
                    id="email"
                    name="email"
                    data-testid="checkout-email"
                    value={ email }
                    onChange={ this.onInputChage }
                  />
                </label>
                <br />
                <label htmlFor="cpf">
                  CPF:
                  <input
                    type="text"
                    id="cpf"
                    name="cpf"
                    data-testid="checkout-cpf"
                    value={ cpf }
                    onChange={ this.onInputChage }
                  />
                </label>
                <br />
                <label htmlFor="telefone">
                  Telefone:
                  <input
                    type="text"
                    id="telefone"
                    name="telefone"
                    data-testid="checkout-phone"
                    value={ telefone }
                    onChange={ this.onInputChage }
                  />
                </label>
                <br />
                <label htmlFor="cep">
                  CEP:
                  <input
                    type="text"
                    id="cep"
                    name="cep"
                    data-testid="checkout-cep"
                    value={ cep }
                    onChange={ this.onInputChage }
                  />
                </label>
                <br />
                <label htmlFor="endereco">
                  Endereço:
                  <input
                    type="text"
                    id="endereco"
                    name="endereco"
                    data-testid="checkout-address"
                    value={ endereco }
                    onChange={ this.onInputChage }
                  />
                </label>
                <br />
                <div>
                  <label htmlFor="boleto">
                    Boleto
                    <input
                      type="radio"
                      name="pagamento"
                      id="boleto"
                      data-testid="ticket-payment"
                      onChange={ this.onInputChage }
                    />
                  </label>
                  <label htmlFor="visa">
                    Visa
                    <input
                      type="radio"
                      name="pagamento"
                      id="visa"
                      data-testid="visa-payment"
                      onChange={ this.onInputChage }
                    />
                  </label>
                  <label htmlFor="master">
                    MasterCard
                    <input
                      type="radio"
                      name="pagamento"
                      id="master"
                      data-testid="master-payment"
                      onChange={ this.onInputChage }
                    />
                  </label>
                  <label htmlFor="elo">
                    Elo
                    <input
                      type="radio"
                      name="pagamento"
                      id="elo"
                      data-testid="elo-payment"
                      onChange={ this.onInputChage }
                    />
                  </label>
                </div>
                <button
                  type="button"
                  data-testid="checkout-btn"
                  onClick={ this.validate }
                >
                  Comprar
                </button>
                { validation && <p data-testid="error-msg">Campos inválidos</p>}
              </form>
            </div>
          )}
      </div>
    );
  }
}

Checkout.propTypes = {
  history: PropTypes.object,
  push: PropTypes.func,
}.isRequired;
