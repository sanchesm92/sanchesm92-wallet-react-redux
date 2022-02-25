import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { addExpense, changeEdit, removeExpense, requestApiData } from '../actions';

class EditBtn extends Component {
  constructor() {
    super();
    this.editingBtn = this.editingBtn.bind(this);
  }

  editingBtn() {
    const { initEditFunc,
      saveExpenseStore, expenses,
      funcProp, getStates, editObj, removeItemList } = this.props;
    const getState = getStates();
    const { value, description, currency, method, tag } = getState;
    const { id, exchangeRates } = editObj;
    const findObject = expenses.find((item) => item.id === id);
    const newObjectToAdd = {
      id,
      exchangeRates,
      value,
      description,
      currency,
      method,
      tag,
    };
    removeItemList(id);
    initEditFunc(findObject, false);
    saveExpenseStore(newObjectToAdd);
    funcProp();
  }

  render() {
    return (
      <button className='button-59' type="button" onClick={ () => this.editingBtn() }>Editar despesa</button>
    );
  }
}

EditBtn.propTypes = {
  expenses: PropTypes.array,
  saveExpenseStore: PropTypes.func,
  initEditFunc: PropTypes.func,
  editObj: PropTypes.object,
}.isRequired;

const mapDispatchToProps = (dispatch) => ({
  saveExpenseStore: (state) => dispatch(addExpense(state)),
  initEditFunc: (state, data) => dispatch(changeEdit(state, data)),
  removeItemList: (state) => dispatch(removeExpense(state)),
  fetchApi: () => dispatch(requestApiData()),
});

const mapStateToProps = (state) => ({
  expenses: state.wallet.expenses,
  isEditing: state.wallet.isEditing,
  editObj: state.wallet.editing,
  currencys: state.wallet.currencies,
});
export default connect(mapStateToProps, mapDispatchToProps)(EditBtn);
