import * as actionsTypes from './actionTypes';

const saveResult = (res) => {
  return {
    type: actionsTypes.STORE_RESULT,
    result: res,
  };
};

const store_result = (res) => {
  return (dispatch, getState) => {
    setTimeout(() => {
      dispatch(saveResult(res));
      // const oldCounter = getState().ctr.counter;
      // console.log(oldCounter);
    }, 2000);
  };
};

const delete_result = (resElId) => {
  return {
    type: actionsTypes.DELETE_RESULT,
    resultElId: resElId,
  };
};

export { store_result, delete_result };
