import React from 'react';
import styled from 'styled-components';
import { compose, withStateHandlers, withHandlers } from 'recompose';
import { graphql } from 'react-apollo';
import gql from 'graphql-tag';
import { TodoListQuery } from './queries';

const NewTodoInput = styled.input`
  width: 100%;
  font-size: 24px;
  line-height: 1.4em;
  outline: none;
  padding: 16px 16px 16px 60px;
  border: none;
  box-shadow: inset 0 -2px 1px rgba(0,0,0,0.03);
  &::placeholder {
    font-style: italic;
    color: #E0E0E0;
  }
`;

const TodoMutation = gql`
  mutation TodoMutation($title: String!) {
    addTodo(title: $title) {
      id,
      title,
      completed,
    }
  }
`;

const NewTodo = ({ onTodoKeyDown, onTodoChange, newTodo }) => (
  <NewTodoInput
    placeholder="What needs to be done?"
    onKeyDown={onTodoKeyDown}
    onChange={onTodoChange}
    autoFocus
    value={newTodo}
  />
);

const changeTodo = ({ newTodo }) => newTodo => ({ newTodo });

const onTodoChange = ({ changeTodo }) => ({ target }) => {
  changeTodo(target.value);
};

const onTodoKeyDown = ({ mutate, newTodo, changeTodo }) => event => {
  if (event.keyCode === 13) {
    event.preventDefault();
    const val = newTodo.trim();

    if (val) {
      mutate({
        mutation: TodoMutation,
        variables: { title: val },
        update: (proxy, { data: { addTodo } }) => {
          // Read the data from our cache for this query.
          const data = proxy.readQuery({ query: TodoListQuery });
          // Add our todo from the mutation to the end.
          data.todoList.push(addTodo);
          // Write our data back to the cache.
          proxy.writeQuery({ query: TodoListQuery, data });
        },
      });
      changeTodo('');
    }
  }
};

export default compose(
  graphql(TodoMutation),
  withStateHandlers({ newTodo: '' }, { changeTodo }),
  withHandlers({ onTodoChange, onTodoKeyDown })
)(NewTodo);
