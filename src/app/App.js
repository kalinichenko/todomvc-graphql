import React from 'react';
import { Query } from 'react-apollo';
import styled from 'styled-components';
import { map, filter, flow } from 'lodash/fp';
import { withProps } from 'recompose';

import NewTodo from './NewTodo';
import Todo from './Todo';
import Filter from './Filter';
import { TodoListQuery } from './queries';
import {
  FILTER_ALL,
  FILTER_COMPLETED,
  FILTER_ACTIVE,
} from '../types';

const Title = styled.h1`
  font-size: 100px;
  line-height: 100px;
  font-weight: 100;
  text-align: center;
  color: rgba(175, 47, 47, 0.15);
`;

const MainSection = styled.section`
  border-top: 1px solid #e6e6e6;
`;

const Todos = styled.ul`
  padding: 0;
  margin: 0;
  background-color: #ffffff;
  list-style-type: none;
`;

const Footer = styled.div`
  background-color: #ffffff;
  padding: 12px 0;
`;

const AppContainer = () => (
  <Query query={TodoListQuery}>
    {({ loading, error, data }) => {
      if (loading) return <div>Loading...</div>;
      if (error) return <div>Error :(</div>;
      return (
        <App data={data} />
      );
    }}
  </Query>
);


const filterTodos = withProps(({ data }) => {
  const todos = flow(
    filter(todo => {
      return data.filterBy.selectedFilter === FILTER_ALL ||
      (data.filterBy.selectedFilter === FILTER_COMPLETED && todo.completed) ||
      (data.filterBy.selectedFilter === FILTER_ACTIVE && !todo.completed);
    }),
    map(todo => <Todo key={todo.id} {...todo} />),
  )(data.todoList);

  return { todos };
});


const App = filterTodos(({ todos }) => (
  <React.Fragment>
    <header>
      <Title>todos</Title>
      <NewTodo />
    </header>
    <MainSection>
      <Todos>{todos}</Todos>
    </MainSection>
    <Footer>
      <Filter />
    </Footer>
  </React.Fragment>
));


export default AppContainer;
