const todos = [];


export const addTodo = (title) => {
  const newTodo = {
    id: todos.length,
    title,
    completed: false,
  };
  todos.push(newTodo);
  return newTodo;
};

export default todos;

