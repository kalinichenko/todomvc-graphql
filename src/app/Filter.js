import React from 'react';
import styled from 'styled-components';
import { Mutation, Query } from 'react-apollo';
import gql from 'graphql-tag';
import { get } from 'lodash';
import {
  FILTER_ALL,
  FILTER_COMPLETED,
  FILTER_ACTIVE,
} from '../types';


const Filter = styled.ul`
  display: flex;
  max-width: 200px;
  padding: 0;
  margin: 0;
  background-color: #ffffff;
  list-style-type: none;
  justify-content: space-between;
  margin: 0 auto;
`;

const Item = styled.li`
  padding: 4px;
  cursor: pointer;
  border: 1px solid transparent;
`;

const SelectedItem = styled.li`
  cursor: pointer;
  padding: 4px;
  border: 1px solid rgba(175, 47, 47, 0.2);
  border-radius: 3px;
`;


const FILTER_BY = gql`
  mutation FilterToto($type: String!) {
    filterTodo(type: $type) @client
  }
`;

export const FilterByQuery = gql`
  {
    filterBy @client {
      selectedFilter
    }
  }
`;


const FilterItem = ({ type, selected }) => (
  <Mutation mutation={FILTER_BY} variables={{ type }}>
    {filterTodo => (
      selected ?
        <SelectedItem onClick={filterTodo}>{type}</SelectedItem> :
        <Item onClick={filterTodo}>{type}</Item>
    )}
  </Mutation>
);


export default () => (
  <Query query={FilterByQuery}>
    {({ data: { filterBy } }) => (
      <Filter>
        {[FILTER_ALL, FILTER_ACTIVE, FILTER_COMPLETED]
          .map(type => (
            <FilterItem
              key={type}
              type={type}
              selected={get(filterBy, 'selectedFilter') === type}
            />))
        }
      </Filter>
    )}
  </Query>
);
