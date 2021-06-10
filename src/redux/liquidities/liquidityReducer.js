import toastConfig from '../settings/toast';
import { toast } from 'react-toastify';

const initialState = {
  isLoading: false,
  liquidity: {},
  error: '',
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case 'FETCH_INITIAL_LIQUIDITY_REQUEST':
      return {
        ...state,
        isLoading: true,
      };
    case 'FETCH_INITIAL_LIQUIDITY_SUCCESS':
      toast("Successfully Fetched Liquidities!", toastConfig);
      return {
        isLoading: false,
        tokens: action.payload,
        error: '',
      };
    case 'FETCH_INITIAL_LIQUIDITY_FAILURE':
      toast(action.payload, toastConfig);
      return {
        isLoading: false,
        tokens: {},
        error: action.payload,
      };
    default:
      return state;
  }
};
export default reducer;
