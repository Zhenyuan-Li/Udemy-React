import React from 'react';
import Link from 'next/Link';

const errorPage = () => (
  <div>
    <h1>Something went wrong</h1>
    <p>
      Try{' '}
      <Link href="/">
        <a>going back</a>
      </Link>
    </p>
  </div>
);

export default errorPage;
