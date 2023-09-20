import {
  POSTS_DATA_REQUEST,
  POSTS_DATA_REQUEST_ERROR,
  POSTS_DATA_REQUEST_SUCCESS,
} from './postsDataAction';

const initialState = {
  status: 'idle',
  data: [],
  error: '',
};

export const postsDataReducer = (state = initialState, action) => {
  switch (action.type) {
    case POSTS_DATA_REQUEST:
      return {
        ...state,
        status: 'loading',
      };
    case POSTS_DATA_REQUEST_SUCCESS:
      return {
        ...state,
        status: 'loaded',
        data: action.data,
        error: '',
      };
    case POSTS_DATA_REQUEST_ERROR:
      return {
        ...state,
        status: 'error',
        error: action.error,
      };
    default:
      return state;
  }
};
