import React from 'react';
import ReactDOM from 'react-dom';
import { AppContainer } from 'react-hot-loader';
import ApolloClient from 'apollo-boost';
import { ApolloProvider } from 'react-apollo';
import App from './app/App';

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
