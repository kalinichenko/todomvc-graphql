import {
  GraphQLObjectType,
  GraphQLNonNull,
  GraphQLString,
  GraphQLBoolean,
} from 'graphql';
import todos from './fakedb';

export const TodoList = new GraphQLObjectType({
  name: 'TodoList',
  fields: {
    id: { type: new GraphQLNonNull(GraphQLString) },
    title: { type: new GraphQLNonNull(GraphQLString) },
    completed: { type: new GraphQLNonNull(GraphQLBoolean) },
  },
});

// it's here just to emulate any async service
export function resolver(root, args) {
  return new Promise(resolve => {
    resolve(todos);
  });
}
