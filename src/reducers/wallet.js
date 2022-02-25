import { ADD_EXPENSE,
  GET_CURRENCY, RM_EXPENSE_ID, CHANGE_EDIT, ADD_TOTAL } from '../actions';

const INITIAL_STATE = {
  currencies: [],
  expenses: [],
  total: {},
  editing: {
    id: 0,
    exchangeRates: {},
    value: 0,
    description: '',
    currency: '',
    method: '',
    tag: '',
  },
  isEditing: false,
};

const wallet = (state = INITIAL_STATE, action) => {
  switch (action.type) {
  case ADD_EXPENSE:
    return { ...state, expenses: [...state.expenses, action.payload] };
  case GET_CURRENCY:
    return { ...state, currencies: action.payload };
  case ADD_TOTAL:
    return { ...state, total: action.payload };
  case RM_EXPENSE_ID:
    return { ...state,
      expenses: state.expenses
        .filter((item) => item.id !== action.payload) };
  case CHANGE_EDIT:
    return { ...state, editing: action.payload, isEditing: action.data };
  default:
    return state;
  }
};

export default wallet;
