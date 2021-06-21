import React from 'react';
import ReactDOM from 'react-dom';
import { ToastContainer } from 'react-toastify';
import { ApolloProvider } from '@apollo/client'
import { HttpLink } from 'apollo-link-http'
import { ApolloClient } from 'apollo-client'
import { InMemoryCache } from 'apollo-cache-inmemory'
import { App } from './App';
import * as serviceWorker from './serviceWorker';

import './index.css';
import 'react-toastify/dist/ReactToastify.css';

const client = new ApolloClient({
  link: new HttpLink({
    uri: 'https://api.thegraph.com/subgraphs/name/uniswap/uniswap-v2'
  }),
  fetchOptions: {
    mode: 'no-cors'
  },
  cache: new InMemoryCache()
})

ReactDOM.render(
  <React.StrictMode>
    <ApolloProvider client={client}>
      <App />
      <ToastContainer />
    </ApolloProvider>
  </React.StrictMode>,
  document.getElementById('root'),
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
