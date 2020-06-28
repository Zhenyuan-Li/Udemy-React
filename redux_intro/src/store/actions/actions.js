const INCREMENT = 'INCREMENT';
const DECREMENT = 'DECREMENT';
const ADD = 'ADD';
const SUBTRACT = 'SUBTRACT';
const STORE_RESULT = 'STORE_RESULT';
const DELETE_RESULT = 'DELETE_RESULT';

const increment = () => {
  return {
    type: INCREMENT,
  };
};

const decrement = () => {
  return {
    type: DECREMENT,
  };
};

const add = (value) => {
  return {
    type: ADD,
    val: value,
  };
};

const subtract = (value) => {
  return {
    type: SUBTRACT,
    val: value,
  };
};

const store_result = (res) => {
  return {
    type: STORE_RESULT,
    result: res,
  };
};

const delete_result = (resElId) => {
  return {
    type: DELETE_RESULT,
    resultElId: resElId,
  };
};

export { INCREMENT, DECREMENT, ADD, SUBTRACT, STORE_RESULT, DELETE_RESULT };
export { increment, decrement, add, subtract, store_result, delete_result };
