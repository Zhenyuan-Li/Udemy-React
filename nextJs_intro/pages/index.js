import React, { Component } from 'react';
import Link from 'next/Link';
import Router from 'next/router';

class IndexPage extends Component {
  static getInitialProps(context) {
    console.log(context);
    const promise = new Promise((resolve, reject) => {
      setTimeout(() => {
        resolve({ appName: "Vincent's Land" });
      }, 5000);
    });
    return promise;
  }

  render() {
    return (
      <div>
        <h1>The Main Page of {this.props.appName}</h1>
        <p>
          Go to{' '}
          <Link href="/auth">
            <a>Auth</a>
          </Link>
          <br /> <br />
          <button onClick={() => Router.push('/auth')}>Go to Auth</button>
        </p>
      </div>
    );
  }
}

export default IndexPage;
