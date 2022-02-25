export const USER_LOGIN = 'USER_LOGIN';
export const ADD_EXPENSE = 'ADD_EXPENSE';
export const RM_EXPENSE_ID = 'RM_EXPENSE_ID';
export const GET_CURRENCY = 'GET_CURRENCY';
export const CHANGE_EDIT = 'CHANGE_EDIT';
export const ADD_TOTAL = 'ADD_TOTAL';

export const userLogin = (payload) => ({
  type: USER_LOGIN,
  payload,
});

export const addExpense = (payload) => ({
  type: ADD_EXPENSE,
  payload,
});

export const removeExpense = (payload) => ({
  type: RM_EXPENSE_ID,
  payload,
});

export const getCurrences = (payload) => ({
  type: GET_CURRENCY,
  payload,
});

export const changeEdit = (payload, data) => ({
  type: CHANGE_EDIT,
  payload,
  data,
});

export const addTotal = (payload) => ({
  type: ADD_TOTAL,
  payload,
});

export function requestApiData() {
  return (dispatch) => fetch('https://economia.awesomeapi.com.br/json/all')
    .then((r) => r.json()
      .then(
        (json) => dispatch(getCurrences(json)),
        (error) => dispatch(console.error(error)),
      ));
}
