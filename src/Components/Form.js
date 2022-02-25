import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { addExpense, changeEdit, requestApiData } from '../actions';
import AddExpBtn from './AddExpBtn';
import EditBtn from './EditBtn';
import './Forms.css';

const Alimentação = 'Alimentação';
class Form extends Component {
  constructor() {
    super();
    this.state = {
      value: 0,
      description: '',
      currency: 'USD',
      method: 'Dinheiro',
      tag: Alimentação,
      currTags: [],
    };
    this.clickToSaveStore = this.clickToSaveStore.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.getCurryTags = this.getCurryTags.bind(this);
    this.clearInputs = this.clearInputs.bind(this);
    this.updateStateValues = this.updateStateValues.bind(this);
    this.getStateValues = this.getStateValues.bind(this);
  }

  async componentDidMount() {
    const { fetchApi } = this.props;
    await fetchApi();
    this.getCurryTags();
  }

  componentDidUpdate(prevProps) {
    const { isEditing } = this.props;
    if (prevProps.isEditing !== isEditing && isEditing === true) {
      this.updateStateValues();
    }
    return null;
  }

  getCurryTags() {
    const { currencys } = this.props;
    const arrKeys = Object.keys(currencys);
    const rmIndex = arrKeys.indexOf('USDT');
    arrKeys.splice(rmIndex, 1);
    this.setState({
      currTags: arrKeys,
    });
  }

  getStateValues() {
    return this.state;
  }

  handleChange({ target }) {
    const { name, value } = target;
    this.setState({
      [name]: value,
    });
  }

  updateStateValues() {
    const { editObj } = this.props;
    const { value, description, currency, method, tag } = editObj;
    this.setState({
      value,
      description,
      currency,
      method,
      tag,
    });
  }

  async clickToSaveStore() {
    const { fetchApi, expenses, currencys, saveExpenseStore } = this.props;
    await fetchApi();
    const { value, description, currency, method,
      tag } = this.state;
    const obj = {
      id: expenses.length,
      value,
      description,
      currency,
      method,
      tag,
      exchangeRates: { ...currencys },
    };
    saveExpenseStore(obj);
    this.clearInputs();
  }

  clearInputs() {
    this.setState({
      value: 0,
      description: '',
      currency: 'USD',
      method: 'Dinheiro',
      tag: Alimentação,
    });
  }

  render() {
    const { isEditing } = this.props;
    const { value, description, currency, method,
      tag, currTags } = this.state;
    return (
      <section className='formsContainer'>
        <label className='valueInput' htmlFor="valor">
          <span>Value</span>
          <input
            onChange={ this.handleChange }
            type="text"
            id="valor"
            value={ value || 0 }
            name="value"
            data-testid="value-input"
          />
        </label>

        <label htmlFor="description">
          <span>Description</span>
          <input
            type="text"
            id="description"
            onChange={ this.handleChange }
            value={ description || '' }
            name="description"
            data-testid="description-input"
          />
        </label>

        <label htmlFor="moeda">
          <span>Currency</span>
          <select
            data-testid="currency-input"
            id="moeda"
            onChange={ this.handleChange }
            value={ currency }
            name="currency"
          >
            {currTags.map((coin, index) => (
              <option data-testid={ `${coin}` } key={ index }>{coin}</option>))}
          </select>
        </label>

        <label htmlFor="method">
          <span>Payment</span>
          <select
            name="method"
            id="method"
            value={ method }
            onChange={ this.handleChange }
            data-testid="method-input"
          >
            <option>cash</option>
            <option>credit card</option>
            <option>debit card</option>
          </select>
        </label>

        <label htmlFor="tag">
          Tag
          <select
            name="tag"
            id="tag"
            onChange={ this.handleChange }
            value={ tag }
            data-testid="tag-input"
          >
            <option>Food</option>
            <option>Leisure</option>
            <option>Work</option>
            <option>Transport</option>
            <option>Health</option>
          </select>
        </label>
        {!isEditing ? (<AddExpBtn funcProp={ this.clickToSaveStore } />)
          : (<EditBtn getStates={ this.getStateValues } funcProp={ this.clearInputs } />)}
      </section>
    );
  }
}
Form.propTypes = {
  fetchApi: PropTypes.func,
  isEditing: PropTypes.bool,
}.isRequired;

const mapStateToProps = (state) => ({
  isEditing: state.wallet.isEditing,
  currencys: state.wallet.currencies,
  expenses: state.wallet.expenses,
  editObj: state.wallet.editing,
});
const mapDispatchToProps = (dispatch) => ({
  fetchApi: () => dispatch(requestApiData()),
  saveExpenseStore: (state) => dispatch(addExpense(state)),
  initEditFunc: (state, data) => dispatch(changeEdit(state, data)),
});
export default connect(mapStateToProps, mapDispatchToProps)(Form);
