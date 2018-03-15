import React from 'react';
import { Query } from 'react-apollo';
import styled from 'styled-components';
import NewTodo from './NewTodo';
import Todo from './Todo';
import { TodoListQuery } from './queries';

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

const App = () => (
  <Query query={TodoListQuery}>
    {({ loading, error, data }) => {
      if (loading) return <div>Loading...</div>;
      if (error) return <div>Error :(</div>;

      return (
        <React.Fragment>
          <header>
            <Title>todos</Title>
            <NewTodo />
          </header>
          <MainSection>
            <Todos>{data.todoList.map(todo => <Todo key={todo.id} {...todo} />)}</Todos>
          </MainSection>
        </React.Fragment>
      );
    }}
  </Query>
);

export default App;
