import React from 'react';
import { Query } from 'react-apollo';
import styled from 'styled-components';
import NewTodo from './NewTodo';
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

const Todo = styled.li`
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
            <Todos>{data.todoList.map(todo =>
              <Todo key={todo.id}><TodoLabel>{todo.title}</TodoLabel></Todo>)}
            </Todos>
          </MainSection>
        </React.Fragment>
      );
    }}
  </Query>
);

export default App;
