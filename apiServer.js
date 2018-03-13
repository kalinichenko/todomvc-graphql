import express from 'express';
import graphqlHTTP from 'express-graphql';
import { GraphQLSchema } from 'graphql';
import Query from './api/query';
import Mutation from './api/mutation';

const app = express();

app.use('/graphql', graphqlHTTP({
  schema: new GraphQLSchema({
    query: Query,
    mutation: Mutation,
  }),
  graphiql: true,
}));


app.listen(4444, () => {
  console.log('GraphQL is running at http://localhost:4444/graphql');
});

