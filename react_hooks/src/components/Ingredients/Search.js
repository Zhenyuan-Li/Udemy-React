import React, { useState, useEffect } from 'react';

import Card from '../UI/Card';
import axios from '../../axios';
import './Search.css';

const Search = React.memo((props) => {
  const { onLoadIngredients } = props;
  const [enteredFilter, setEnteredFilter] = useState('');

  useEffect(() => {
    const query =
      enteredFilter.length === 0
        ? ''
        : `?orderBy="title"&equalTo="${enteredFilter}"`;
    axios
      // eslint-disable-next-line no-undef
      .get(`${process.env.REACT_APP_BASE_URL}/ingredients.json${query}`)
      .then((res) => {
        const loadedIngredients = [];
        for (const key in res.data) {
          loadedIngredients.push({
            id: key,
            title: res.data[key].title,
            amount: res.data[key].amount,
          });
        }
        onLoadIngredients(loadedIngredients);
      });
  }, [enteredFilter, onLoadIngredients]);

  return (
    <section className="search">
      <Card>
        <div className="search-input">
          <label>Filter by Title</label>
          <input
            type="text"
            value={enteredFilter}
            onChange={(event) => setEnteredFilter(event.target.value)}
          />
        </div>
      </Card>
    </section>
  );
});

Search.displayName = 'Search';

export default Search;
