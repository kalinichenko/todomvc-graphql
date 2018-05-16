import gql from 'graphql-tag';

export const TodoListQuery = gql`
  query {
    todoList {
      id
      title
      completed
    }
    filterBy @client {
      selectedFilter
    }
  }
`;
