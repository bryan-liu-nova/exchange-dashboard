import React, { useCallback, useEffect, useState } from 'react'
import { BrowserRouter, Route, Redirect } from 'react-router-dom';
import { useApolloClient } from '@apollo/client'
import { useQuery } from '@apollo/react-hooks'
import gql from 'graphql-tag'
import Home from './pages/Home';
import Dashboard from './pages/Dashboard';
import './App.css'

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
  const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const { loading: latestPairLoading, data: latestPairsData } = useQuery(GET_LATEST_PAIRS, {
    pollInterval: 500,
  })
  // const getData = useCallback(async () => {
  //   const result = [];
  //   try {
  //     const data = await client.query({ query: GET_LATEST_PAIRS, variables: { pollInterval: 500 } });
  //     console.log(data);
  //     if (data && data.data && data.data.pairs && data.data.pairs.length > 0) {
  //       let res = data.data.pairs;
  //       for (let i = 0; i < res.length; i++) {
  //         const initialData = await client.query({ query: INITIAL_PRICE, variables: { token: res[i].id } });
  //         result.push({
  //           ...res[i],
  //           mints: initialData.data.mints
  //         });
  //       }
  //     }
  //   } catch (error) {
  //     console.log(error);
  //   }
  //   setData(result);
  // })

  const getInitialData = useCallback(async () => {
    if (latestPairLoading) {
      setIsLoading(true);
    }
    const result = [];
    if (latestPairsData
      && latestPairsData.pairs
      && latestPairsData.pairs.length > 0
    ) {
      let res = latestPairsData.pairs;
      for (let i = 0; i < res.length; i++) {
        try {
          const initialData = await client.query({
            query: INITIAL_PRICE,
            variables: { token: res[i].id }
          });
          result.push({
            ...res[i],
            mints: initialData.data.mints
          });
        } catch (error) {
          console.log(error);
        }
      }
      setIsLoading(false);
    }
    setData(result);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [latestPairsData, client])

  useEffect(() => {
    getInitialData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [latestPairsData]);

  return (
    <BrowserRouter>
      <Route exact path="/">
        {authenticated ?
          <Redirect to="/dashboard" /> :
          <Home
            data={data}
            isLoading={isLoading}
          />
        }
      </Route>
      <Route path="/dashboard" component={Dashboard} />
    </BrowserRouter>
  );
}

export default App