import {
  findIndex,
  find,
} from 'lodash';

const todos = [];

const s4 = () => {
  return Math.floor((1 + Math.random()) * 0x10000)
    .toString(16)
    .substring(1);
};

const guid = () => {
  return `${s4()}${s4()}-${s4()}-${s4()}-${s4()}-${s4()}${s4()}${s4()}`;
};

export const addTodo = (title) => {
  const newTodo = {
    id: guid(),
    title,
    completed: false,
  };
  todos.push(newTodo);
  return newTodo;
};

export const removeTodo = (id) => {
  const index = findIndex(todos, item => item.id === id);
  todos.splice(index, 1);
  return todos;
};

export const toggleTodo = (id, completed) => {
  const todo = find(todos, item => item.id === id);
  todo.completed = completed;
  return todo;
};

export default todos;

