import { gql } from 'apollo-boost';

export const TodoListQuery = gql`
  query {
    todoList {
      id
      title
      completed
    }
  }
`;
