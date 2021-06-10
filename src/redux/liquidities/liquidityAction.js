import api from '../settings/api';
import { fetchInitialLiquidityQuery } from '../settings/queries'
const url = "https://graphql.bitquery.io/";

export const fetchInitialLiquidity = () => {
  return async (dispatch) => {
    dispatch(fetchInitialLiquidityRequest);
    try {
      const data = await api.post(url, JSON.stringify({
        query: fetchInitialLiquidityQuery("0xea75c228babc629fad1dff51373fb66e311b2aed")
      }))
      dispatch(fetchInitialLiquiditySuccess(data.data.data.ethereum.transfers))
    } catch (error) {
      dispatch(fetchInitialLiquidityFailure);
    }
  }
}

const fetchInitialLiquidityRequest = () => {
  return {
    type: "FETCH_INITIAL_LIQUIDITY_REQUEST"
  }
}

const fetchInitialLiquiditySuccess = (newTokens) => {
  return {
    type: "FETCH_INITIAL_LIQUIDITY_SUCCESS",
    payload: newTokens
  }
}

const fetchInitialLiquidityFailure = (error) => {
  return {
    type: "FETCH_INITIAL_LIQUIDITY_FAILURE",
    payload: error
  }
}