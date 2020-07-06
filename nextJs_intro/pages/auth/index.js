import React from 'react';

import User from '../../components/User';

const authIndexPage = (props) => (
  <div>
    <h1>The Auth Index Page - {props.appName}</h1>
    <User name="Vincent" age={25} />
  </div>
);

authIndexPage.getInitialProps = (context) => {
  console.log(context);
  const promise = new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve({ appName: "Vincent's Land" });
    }, 5000);
  });
  return promise;
};

export default authIndexPage;
