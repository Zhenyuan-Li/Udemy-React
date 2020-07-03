import { useReducer, useCallback } from 'react';
import axios from '../axios';

const initialState = {
  loading: false,
  error: null,
  data: null,
  extra: null,
  method: null,
};

const httpReducer = (currentState, action) => {
  switch (action.type) {
    case 'SEND':
      return {
        loading: true,
        error: null,
        data: null,
        extra: null,
        method: action.reqMethod,
      };
    case 'RESPONSE':
      return {
        ...currentState,
        loading: false,
        data: action.responseData,
        extra: action.extra,
      };
    case 'ERROR':
      return { loading: false, error: action.errorMessage };
    case 'CLEAR':
      return initialState;
    default:
      throw new Error('Should not get here!');
  }
};

const useHttp = () => {
  const [httpState, dispatchHttp] = useReducer(httpReducer, initialState);

  const clear = useCallback(() => dispatchHttp({ type: 'CLEAR' }), []);

  const sendRequest = useCallback((url, reqMethod, body, reqExtra) => {
    dispatchHttp({ type: 'SEND', reqMethod });

    axios({ reqMethod, url, data: body })
      .then((response) => {
        dispatchHttp({
          type: 'RESPONSE',
          responseData: response.data,
          extra: reqExtra,
        });
      })
      .catch(() => {
        dispatchHttp({
          type: 'ERROR',
          errorMessage: 'Something went wrong...',
        });
      });
  }, []);

  return {
    isLoading: httpState.loading,
    data: httpState.data,
    error: httpState.error,
    sendRequest,
    reqExtra: httpState.extra,
    reqMethod: httpState.method,
    clear,
  };
};

export default useHttp;
