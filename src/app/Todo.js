import React from 'react';
import styled from 'styled-components';
import { graphql } from 'react-apollo';
import gql from 'graphql-tag';
import { TodoListQuery } from './queries';

const TodoItem = styled.li`
  font-size: 24px;
  border-bottom: 1px solid #ededed;
  position: relative;
`;

const TodoLabel = styled.label`
  white-space: pre-line;
  word-break: break-all;
  padding: 15px 60px 15px 15px;
  margin-left: 45px;
  display: block;
  line-height: 1.2;
`;

const RemoveButton = styled.button`
  outline: none;
  display: none;
  position: absolute;
  top: 0;
  right: 10px;
  bottom: 0;
  width: 40px;
  height: 40px;
  margin: auto 0;
  font-size: 30px;
  color: #cc9a9a;
  margin-bottom: 11px;
  transition: color 0.2s ease-out;
  padding: 0;
  border: 0;
  background: none;
  vertical-align: baseline;
  appearance: none;
  font-smoothing: antialiased;

  ${TodoItem} &:after {
    content: '×';
  }

  ${TodoItem}:hover & {
    display: block;
  }
`;


const TodoMutation = gql`
  mutation TodoMutation($id: String!) {
    removeTodo(id: $id) {
      id,
      title,
      completed,
    }
  }
`;

class Todo extends React.Component {
  remove = (id) => {
    this.props.mutate({
      mutation: TodoMutation,
      variables: { id },
      update: (proxy, { data: { removeTodo } }) => {
        // Read the data from our cache for this query.
        const data = proxy.readQuery({ query: TodoListQuery });
        // Add our todo from the mutation to the end.
        data.todoList.splice(id, 1);
        // Write our data back to the cache.
        proxy.writeQuery({ query: TodoListQuery, data });
      },
    });

  }

  render() {
    const {
      id,
      title,
    } = this.props;

    return (
      <TodoItem>
        <TodoLabel>{title}</TodoLabel>
        <RemoveButton onClick={() => this.remove(id)}/>
      </TodoItem>
    );
  }
}

export default graphql(TodoMutation)(Todo);
