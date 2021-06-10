import api from '../settings/api';
import { fetchNewPairsQuery } from '../settings/queries'
const URL = process.env.REACT_APP_UNISWAP_API_URL;

export const fetchNewPairs = () => {
  return async (dispatch) => {
    dispatch(fetchNewPairsRequest);
    try {
      const data = await api.post(URL, JSON.stringify({
        query: fetchNewPairsQuery
      }))
      console.log(data,'this is data');
      // dispatch(fetchNewPairsSuccess(data.data.data.ethereum.smartContractEvents));
    } catch (error) {
      console.log(error.message, 'this is error');
      dispatch(fetchNewPairsFailure);
    }
  }
}

const fetchNewPairsRequest = () => {
  return {
    type: "FETCH_NEW_TOKENS_REQUEST"
  }
}

const fetchNewPairsSuccess = (newTokens) => {
  return {
    type: "FETCH_NEW_TOKENS_SUCCESS",
    payload: newTokens
  }
}

const fetchNewPairsFailure = (error) => {
  return {
    type: "FETCH_NEW_TOKENS_FAILURE",
    payload: error
  }
}