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
  todos.splice(id, 1);
  return todos;
};

export default todos;

