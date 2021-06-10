import toastConfig from '../settings/toast';
import { toast } from 'react-toastify';

const initialState = {
  isLoading: false,
  pairs: {},
  error: '',
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case 'FETCH_NEW_TOKENS_REQUEST':
      return {
        ...state,
        isLoading: true,
      };
    case 'FETCH_NEW_TOKENS_SUCCESS':
      toast("Successfully Fetched New Tokens!", toastConfig);
      return {
        isLoading: false,
        pairs: action.payload,
        error: '',
      };
    case 'FETCH_NEW_TOKENS_FAILURE':
      toast(action.payload, toastConfig);
      return {
        isLoading: false,
        pairs: {},
        error: action.payload,
      };
    default:
      return state;
  }
};
export default reducer;
