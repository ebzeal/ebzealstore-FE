import React, { Component } from 'react';
import {Query} from 'react-apollo';
import {ALL_ITEMS_QUERY} from '.././../queries/itemsQueries';
import styled from 'styled-components';
import Item from './Item';


const Center = styled.div`
  text-align: center;
`;

const ItemsList = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  grid-gap: 60px;
  max-width: ${props => props.theme.maxWidth};
  margin: 0 auto;
`;

class Items extends Component {
  render() {
    return (
      <Center>
        <p>
          Items
        </p>
        <Query query={ALL_ITEMS_QUERY}>
          {({data, error, loading})=>{
            console.log(data);
            return loading ? <p>Loading ...</p> :
             error ? <p>Error: {error.message}</p> :
              <ItemsList>
                {data.items.map((item)=>
                  <Item item={item} key={item.id}/>
                  )}
              </ItemsList>
            
          }}
        </Query>
      </Center>
    );
  }
}

export default Items;
