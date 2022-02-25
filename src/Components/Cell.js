import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { changeEdit, removeExpense, requestApiData } from '../actions';
import './Cell.css';

class Cell extends Component {
  constructor() {
    super();
    this.editItem = this.editItem.bind(this);
  }

  editItem(itemId) {
    const { expenses, changeStateEdit } = this.props;
    const findObj = expenses.find((item) => item.id === itemId);
    const { id, value, description, currency, method, tag, exchangeRates } = findObj;
    const newObj = {
      id,
      value,
      description,
      currency,
      method,
      tag,
      exchangeRates,
    };
    changeStateEdit(newObj, true);
  }

  render() {
    const { expenses, removeBtn } = this.props;
    return (
      <table className='tableContainer'>
        <thead>
          <tr className='thead'>
            <th>Descrição</th>
            <th>Tag</th>
            <th>Método de pagamento</th>
            <th>Valor</th>
            <th>Moeda</th>
            <th>Câmbio utilizado</th>
            <th>Valor convertido</th>
            <th>Moeda de conversão</th>
            <th>Editar/Excluir</th>
          </tr>
        </thead>
        <tbody>
          {expenses
            .map(({ id, description, tag, currency, method, value, exchangeRates }) => (
              <tr key={ id }>
                <td>{description}</td>
                <td>{tag}</td>
                <td>{method}</td>
                <td>{value}</td>
                <td>
                  {exchangeRates[currency].name.split('/')[0] }
                </td>
                <td>{Number(exchangeRates[currency].ask).toFixed(2)}</td>

                <td>
                  {
                    (Number(exchangeRates[currency].ask) * Number(value)).toFixed(2)
                  }
                </td>
                <td>Real</td>
                <td>
                  <button
                    className='button-edit'
                    data-testid="edit-btn"
                    onClick={ () => this.editItem(id) }
                    type="button"
                  >
                    Edit
                  </button>
                  <button
                    className='button-Delete'
                    data-testid="delete-btn"
                    onClick={ () => removeBtn(id) }
                    type="button"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
        </tbody>
      </table>
    );
  }
}

Cell.propTypes = {
  expenses: PropTypes.array,
  removeBtn: PropTypes.func,
  changeStateEdit: PropTypes.func,
  fetchApi: PropTypes.func,
}.isRequired;

const mapStateToProps = (state) => ({
  expenses: state.wallet.expenses,
  currencys: state.wallet.currencies,
  editObj: state.wallet.editing,
});

const mapDispatchToProps = (dispatch) => ({
  removeBtn: (id) => dispatch(removeExpense(id)),
  changeStateEdit: (obj, bool) => dispatch(changeEdit(obj, bool)),
  fetchApi: () => dispatch(requestApiData()),
});

export default connect(mapStateToProps, mapDispatchToProps)(Cell);
