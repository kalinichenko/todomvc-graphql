import React from 'react';
import ReactDOM from 'react-dom';
import { AppContainer } from 'react-hot-loader';
import { ApolloClient } from 'apollo-client';
import { ApolloProvider } from 'react-apollo';
import { InMemoryCache } from 'apollo-cache-inmemory';
import { withClientState } from 'apollo-link-state';
import { ApolloLink } from 'apollo-link';
import { HttpLink } from 'apollo-link-http';
import { injectGlobal } from 'styled-components';

import App from './app/App';
import { resolvers, defaults } from './resolvers';


const global = injectGlobal`
  body {
    font: 14px 'Helvetica Neue', Helvetica, Arial, sans-serif;
    line-height: 1.4em;
    color: #4d4d4d;
    background: #f5f5f5;
    min-width: 230px;
    max-width: 550px;
    margin: 0 auto;
    font-weight: 300;
  }
`;

const typeDefs = `
`;

const cache = new InMemoryCache();

const stateLink = withClientState({
  resolvers,
  cache,
  defaults,
  typeDefs,
});

const client = new ApolloClient({
  cache,
  link: ApolloLink.from([stateLink, new HttpLink()]),
});

const render = (Component) => ReactDOM.render(
  <AppContainer>
    <ApolloProvider client={client}>
      <Component />
    </ApolloProvider>
  </AppContainer>
, document.getElementById('root'));

render(App);

if (module.hot) {
  module.hot.accept('./app/App.js', () => {
    const nextApp = require('./app/App.js').default;
    render(nextApp);
  });
}
