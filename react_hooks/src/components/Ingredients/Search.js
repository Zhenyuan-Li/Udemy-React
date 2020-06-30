import React from 'react';

import Card from '../UI/Card';
import './Search.css';

const Search = React.memo(() => {
  return (
    <section className="search">
      <Card>
        <div className="search-input">
          <label>Filter by Title</label>
          <input type="text" />
        </div>
      </Card>
    </section>
  );
});

Search.displayName = 'Search';

export default Search;
