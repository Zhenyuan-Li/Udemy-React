import React from 'react';

import Card from '../UI/Card';
import './ProductItem.css';
import { useStore } from '../../hooks/store';

const ProductItem = ({ id, isFav, title, description }) => {
  const dispatch = useStore(false)[1];

  const toggleFavHandler = () => {
    dispatch('TOGGLE_FAV', id);
  };

  return (
    <Card style={{ marginBottom: '1rem' }}>
      <div className="product-item">
        <h2 className={isFav ? 'is-fav' : ''}>{title}</h2>
        <p>{description}</p>
        <button
          className={!isFav ? 'button-outline' : ''}
          onClick={toggleFavHandler}
          type="button"
        >
          {isFav ? 'Un-Favorite' : 'Favorite'}
        </button>
      </div>
    </Card>
  );
};

export default ProductItem;
