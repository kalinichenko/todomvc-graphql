import {
  GraphQLObjectType,
  GraphQLNonNull,
  GraphQLString,
  GraphQLBoolean,
  GraphQLInt,
} from 'graphql';

export const TodoList = new GraphQLObjectType({
  name: 'TodoList',
  fields: {
    id: { type: new GraphQLNonNull(GraphQLInt) },
    title: { type: new GraphQLNonNull(GraphQLString) },
    completed: { type: new GraphQLNonNull(GraphQLBoolean) },
  },
});

// it's here just to emulate any async service
export function resolver(root, args) {
  return new Promise(resolve => {
    resolve({
      id: 0,
      title: 'title',
      completed: false,
    });
  });
}
