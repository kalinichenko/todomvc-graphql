import {
  GraphQLNonNull,
  GraphQLString,
  GraphQLObjectType,
  GraphQLList,
  GraphQLBoolean,
} from 'graphql';

import { TodoList } from './todolist';
import { addTodo, removeTodo, toggleTodo } from './fakedb';

export default new GraphQLObjectType({
  name: 'TodoMutation',
  fields: {
    addTodo: {
      type: TodoList,
      args: {
        title: { type: new GraphQLNonNull(GraphQLString) },
      },
      resolve: (_, { title }) => {
        return addTodo(title);
      },
    },
    removeTodo: {
      type: new GraphQLList(TodoList),
      args: {
        id: { type: new GraphQLNonNull(GraphQLString) },
      },
      resolve: (_, { id }) => {
        return removeTodo(id);
      },
    },
    toggleTodo: {
      type: TodoList,
      args: {
        id: { type: new GraphQLNonNull(GraphQLString) },
        completed: { type: new GraphQLNonNull(GraphQLBoolean) },
      },
      resolve: (_, { id, completed }) => {
        return toggleTodo(id, completed);
      },
    },
  },
});
