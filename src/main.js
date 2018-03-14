import React from 'react';
import ReactDOM from 'react-dom';
import { AppContainer } from 'react-hot-loader';
import ApolloClient from 'apollo-boost';
import { ApolloProvider } from 'react-apollo';
import App from './app/App';
import { injectGlobal } from 'styled-components';

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

const client = new ApolloClient();

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
