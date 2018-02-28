import React from 'react';
import { gql } from 'apollo-boost';
import { Query } from 'react-apollo';

const GET_TODO_LIST = gql`
  query {
    todoList {
      id
      title
      completed
    }
  }
`;

const App = () => (
  <Query query={GET_TODO_LIST}>
    {({ loading, error, data }) => {
      if (loading) return <div>Loading...</div>;
      if (error) return <div>Error :(</div>;

      return (
        <div>
          <h2>{data.todoList.title}</h2>
        </div>
      );
    }}
  </Query>
);

export default App;
