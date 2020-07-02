import React, { useReducer, useEffect, useCallback } from 'react';

import IngredientForm from './IngredientForm';
import IngredientList from './IngredientList';
import Search from './Search';
import ErrorModal from '../UI/ErrorModal';
import axios from '../../axios';

const ingredientReducer = (currentIngredients, action) => {
  switch (action.type) {
    case 'SET':
      return action.ingredients;
    case 'ADD':
      return [...currentIngredients, action.ingredient];
    case 'DELETE':
      return currentIngredients.filter((ing) => ing.id !== action.id);
    default:
      throw new Error('Should not get here!');
  }
};

const httpReducer = (currentState, action) => {
  switch (action.type) {
    case 'SEND':
      return { loading: true, error: null };
    case 'RESPONSE':
      return { ...currentState, loading: false };
    case 'ERROR':
      return { loading: false, error: action.errorMessage };
    case 'CLEAR':
      return { ...currentState, error: null };
    default:
      throw new Error('Should not get here!');
  }
};

const Ingredients = () => {
  const [userIngredients, dispatchIngredients] = useReducer(
    ingredientReducer,
    []
  );
  const [httpState, dispatchHttp] = useReducer(httpReducer, {
    loading: false,
    error: null,
  });

  useEffect(() => {
    console.log('RENDERING INGREDIENTS', userIngredients);
  }, [userIngredients]);

  const filteredIngredientsHandler = useCallback((filteredIngredients) => {
    dispatchIngredients({ type: 'SET', ingredients: filteredIngredients });
  }, []);

  const addIngredientHandler = (ingredient) => {
    dispatchHttp({ type: 'SEND' });
    axios
      // eslint-disable-next-line no-undef
      .post(`${process.env.REACT_APP_BASE_URL}/ingredients.json`, ingredient)
      .then((res) => {
        dispatchHttp({ type: 'RESPONSE' });
        dispatchIngredients({
          type: 'ADD',
          ingredient: { id: res.data.name, ...ingredient },
        });
      });
  };

  const removeIngredientHandler = (ingredientId) => {
    dispatchHttp({ type: 'SEND' });
    axios
      .delete(
        // eslint-disable-next-line no-undef
        `${process.env.REACT_APP_BASE_URL}/ingredients/${ingredientId}.json`
      )
      .then(() => {
        dispatchHttp({ type: 'RESPONSE' });
        dispatchIngredients({ type: 'DELETE', id: ingredientId });
      })
      .catch(() => {
        dispatchHttp({
          type: 'ERROR',
          errorMessage: 'Something went wrong...',
        });
      });
  };

  const clearError = () => {
    dispatchHttp({ type: 'CLEAR' });
  };

  return (
    <div className="App">
      {httpState.error && (
        <ErrorModal onClose={clearError}>{httpState.error}</ErrorModal>
      )}

      <IngredientForm onAddIngredient={addIngredientHandler} />

      <section>
        <Search onLoadIngredients={filteredIngredientsHandler} />
        <IngredientList
          ingredients={userIngredients}
          onRemoveItem={removeIngredientHandler}
          loading={httpState.loading}
        />
      </section>
    </div>
  );
};

export default Ingredients;
