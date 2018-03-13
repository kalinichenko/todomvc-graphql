import {
  GraphQLNonNull,
  GraphQLString,
  GraphQLObjectType,
} from 'graphql';

import { TodoList } from './todolist';
import { addTodo } from './fakedb';

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
  },
});
