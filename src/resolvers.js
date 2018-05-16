export const defaults = {
  filterBy: {
    selectedFilter: 'All',
    __typename: 'FilterBy',
  },
};

export const resolvers = {
  Mutation: {
    filterTodo: (_, { type }, { cache }) => {
      const data = {
        filterBy: {
          selectedFilter: type,
          __typename: 'FilterBy',
        },
      };

      cache.writeData({ data });
      return null;
    },
  },
};
