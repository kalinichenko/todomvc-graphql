import { GraphQLObjectType } from 'graphql';

import {
  TodoList,
  resolver as todoListResolver,
} from './todolist';

export default new GraphQLObjectType({
  name: 'Query',
  fields: {
    todoList: {
      type: TodoList,
      args: {
      },
      resolve: todoListResolver,
    },
  },
});
