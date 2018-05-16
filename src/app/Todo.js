import React from 'react';
import styled from 'styled-components';
import { graphql, compose } from 'react-apollo';
import gql from 'graphql-tag';
import { find } from 'lodash';
import { withHandlers } from 'recompose';

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

const CompletedLabel = TodoLabel.extend`
  color: #d9d9d9;
  text-decoration: line-through;
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

const Toggle = styled.input`
  height: 40px;
  background: none;
  text-align: center;
  width: 40px;
  position: absolute;
  top: 0;
  bottom: 0;
  margin: auto 0;
  border: none;
  outline: none;
  appearance: none;

  &:checked:after {
    content: url('data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="40" height="40" viewBox="-10 -18 100 135"><circle cx="50" cy="50" r="50" fill="none" stroke="#bddad5" stroke-width="3"/><path fill="#5dc2af" d="M72 25L42 71 27 56l-4 4 20 20 34-52z"/></svg>');
  }
  &:after {
    content: url('data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="40" height="40" viewBox="-10 -18 100 135"><circle cx="50" cy="50" r="50" fill="none" stroke="#ededed" stroke-width="3"/></svg>');
  }
`;

const RemoveTodoMutation = gql`
  mutation RemoveTodoMutation($id: String!) {
    removeTodo(id: $id) {
      id,
      title,
      completed,
    }
  }
`;

const ToggleTodoMutation = gql`
  mutation ToggleTodoMutation($id: String!, $completed: Boolean!) {
    toggleTodo(id: $id, completed: $completed) {
      id,
      title,
      completed,
    }
  }
`;


const Todo = ({
  title,
  completed,
  onToggle,
  onRemove,
}) => (
  <TodoItem>
    <Toggle
      type="checkbox"
      defaultChecked={completed}
      onClick={onToggle}
    />
    {completed ?
      <CompletedLabel>{title}</CompletedLabel> :
      <TodoLabel>{title}</TodoLabel>
    }
    <RemoveButton onClick={onRemove}/>
  </TodoItem>
);

const onRemove = ({ id, mutate }) => event => {
  mutate({
    mutation: RemoveTodoMutation,
    variables: { id },
    update: (proxy, { data: { removeTodo } }) => {
      // Read the data from our cache for this query.
      const data = proxy.readQuery({ query: TodoListQuery });
      data.todoList = removeTodo;
      // Write our data back to the cache.
      proxy.writeQuery({ query: TodoListQuery, data });
    },
  });
};

const onToggle = ({ id, completed, mutate }) => event => {
  mutate({
    mutation: ToggleTodoMutation,
    variables: { id, completed: !completed },
    update: (proxy, { data: { toggleTodo } }) => {
      // Read the data from our cache for this query.
      const data = proxy.readQuery({ query: TodoListQuery });
      const todo = find(data.todoList, item => item.id === toggleTodo.id);
      todo.completed = !completed;
      // Write our data back to the cache.
      proxy.writeQuery({ query: TodoListQuery, data });
    },
  });
};


export default compose(graphql(RemoveTodoMutation), graphql(ToggleTodoMutation), withHandlers({ onToggle, onRemove }))(Todo);
