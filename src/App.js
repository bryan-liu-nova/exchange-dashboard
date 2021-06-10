import React, { useCallback, useEffect, useState } from 'react'
import { BrowserRouter, Route, Redirect } from 'react-router-dom';
import { HttpLink } from 'apollo-link-http'
import { ApolloClient } from 'apollo-client'
import { InMemoryCache } from 'apollo-cache-inmemory'
import { useApolloClient } from '@apollo/react-hooks'
import gql from 'graphql-tag'
import Home from './pages/Home';
import Dashboard from './pages/Dashboard';
import './App.css'

export const client = new ApolloClient({
  link: new HttpLink({
    uri: 'https://api.thegraph.com/subgraphs/name/uniswap/uniswap-v2'
  }),
  fetchOptions: {
    mode: 'no-cors'
  },
  cache: new InMemoryCache()
})

// const ETH_PRICE_QUERY = gql`
//   query bundles {
//     bundles(where: { id: "1" }) {
//       ethPrice
//     }
//   }
// `

const GET_LATEST_PAIRS = gql`{
  pairs (first:10 orderBy:createdAtTimestamp orderDirection:desc) {
    id
    createdAtTimestamp
    createdAtBlockNumber
    token0 {
      id
      symbol
      name
      totalSupply
    }
    token1 {
      id
      symbol
      name
    }
    reserve0
    reserve1
    reserveUSD
  }
}`

const INITIAL_PRICE = gql`
query fetchMints($token: String!)
{
  mints(first: 1, 
    orderBy: timestamp, orderDirection: asc
    where: { pair: $token }
  ) {
   transaction {
     id
     timestamp
   }
    pair{
      id
    }
   to
   liquidity
    sender
    feeTo
    feeLiquidity
   amount0
   amount1
   amountUSD
 }
}`

function App() {
  const authenticated = false;
  const client = useApolloClient();
  // const { loading: pairsLoading, data: pairsData } = useQuery(GET_LATEST_PAIRS);
  // const [isLoading, setIsLoading] = useState(true);
  const [data, setData] = useState([]);
  // const [pairsResult, setPairsResult] = useState([]);

  const getData = useCallback(async () => {
    const result = [];
    try {
      const data = await client.query({ query: GET_LATEST_PAIRS, variables: { pollInterval: 1000 } });
      if (data && data.data && data.data.pairs && data.data.pairs.length > 0) {
        let res = data.data.pairs;
        for (let i = 0; i < res.length; i++) {
          const initialData = await client.query({ query: INITIAL_PRICE, variables: { token: res[i].id } });
          result.push({
            ...res[i],
            mints: initialData.data.mints
          });
        }
      }
    } catch (error) {
      console.log(error);
    }
    setData(result);
  }, [client])

  useEffect(() => {
    getData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [getData])
  return (
    <BrowserRouter>
      <Route exact path="/">
        {authenticated ?
          <Redirect to="/dashboard" /> :
          <Home
            data={data}
            isLoading={false}
          />
        }
      </Route>
      <Route path="/dashboard" component={Dashboard} />
    </BrowserRouter>
  );
}

export default App