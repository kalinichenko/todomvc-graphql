import {
  GraphQLObjectType,
  GraphQLList,
} from 'graphql';

import {
  TodoList,
  resolver as todoListResolver,
} from './todolist';

export default new GraphQLObjectType({
  name: 'Query',
  fields: {
    todoList: {
      type: new GraphQLList(TodoList),
      args: {
      },
      resolve: todoListResolver,
    },
  },
});
