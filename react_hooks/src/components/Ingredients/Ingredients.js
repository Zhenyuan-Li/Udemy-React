/* eslint-disable no-undef */
import React, { useReducer, useEffect, useCallback, useMemo } from 'react';

import IngredientForm from './IngredientForm';
import IngredientList from './IngredientList';
import Search from './Search';
import ErrorModal from '../UI/ErrorModal';
import useHttp from '../../hooks/http';

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

const Ingredients = () => {
  const [userIngredients, dispatchIngredients] = useReducer(
    ingredientReducer,
    []
  );
  const {
    isLoading,
    error,
    data,
    sendRequest,
    reqExtra,
    reqMethod,
    clear,
  } = useHttp();

  useEffect(() => {
    if (!isLoading && !error && reqMethod === 'delete') {
      dispatchIngredients({ type: 'DELETE', id: reqExtra });
    } else if (!isLoading && !error && reqMethod === 'post') {
      dispatchIngredients({
        type: 'ADD',
        ingredient: { id: data.name, ...reqExtra },
      });
    }
  }, [data, reqExtra, reqMethod, error, isLoading]);

  const filteredIngredientsHandler = useCallback((filteredIngredients) => {
    dispatchIngredients({ type: 'SET', ingredients: filteredIngredients });
  }, []);

  const addIngredientHandler = useCallback(
    (ingredient) => {
      sendRequest(
        `${process.env.REACT_APP_BASE_URL}/ingredients.json`,
        'post',
        ingredient,
        ingredient
      );
    },
    [sendRequest]
  );

  const removeIngredientHandler = useCallback(
    (ingredientId) => {
      sendRequest(
        `${process.env.REACT_APP_BASE_URL}/ingredients/${ingredientId}.json`,
        'delete',
        null,
        ingredientId
      );
    },
    [sendRequest]
  );

  const ingredientList = useMemo(() => {
    return (
      <IngredientList
        ingredients={userIngredients}
        onRemoveItem={removeIngredientHandler}
        loading={isLoading}
      />
    );
  }, [userIngredients, isLoading, removeIngredientHandler]);

  return (
    <div className="App">
      {error && <ErrorModal onClose={clear}>{error}</ErrorModal>}

      <IngredientForm onAddIngredient={addIngredientHandler} />

      <section>
        <Search onLoadIngredients={filteredIngredientsHandler} />
      </section>

      {ingredientList}
    </div>
  );
};

export default Ingredients;
