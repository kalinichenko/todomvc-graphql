import React from 'react';
import styled from 'styled-components';

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

class NewTodo extends React.Component {
  state = { newTodo: '' };

  handleNewTodoKeyDown = event => {
    if (event.keyCode === 13) {
      event.preventDefault();
      const val = this.state.newTodo.trim();

      if (val) {
        this.props.mutate({
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
        this.setState(() => ({ newTodo: '' }));
      }
    }
  }

  handleChange = event => {
    this.setState({ newTodo: event.target.value });
  }

  render() {
    return (
      <NewTodoInput
        placeholder="What needs to be done?"
        onKeyDown={this.handleNewTodoKeyDown}
        onChange={this.handleChange}
        autoFocus
        value={this.state.newTodo}
      />
    );
  }
}

export default graphql(TodoMutation)(NewTodo);
