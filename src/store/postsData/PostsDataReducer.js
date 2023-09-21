import {
  CHANGE_PAGE,
  POSTS_DATA_REQUEST,
  POSTS_DATA_REQUEST_ERROR,
  POSTS_DATA_REQUEST_SUCCESS,
  POSTS_DATA_REQUEST_SUCCESS_AFTER,
} from './postsDataAction';

const initialState = {
  status: 'idle',
  data: [],
  error: '',
  after: '',
  isLast: '',
  page: '',
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
        after: action.after,
        isLast: !action.after,
      };
    case POSTS_DATA_REQUEST_SUCCESS_AFTER:
      return {
        ...state,
        status: 'loaded',
        data: [...state.data, ...action.data],
        error: '',
        after: action.after,
        isLast: !action.after,
      };
    case POSTS_DATA_REQUEST_ERROR:
      return {
        ...state,
        status: 'error',
        error: action.error,
      };
    case CHANGE_PAGE:
      return {
        ...state,
        page: action.page,
        after: '',
        isLast: false,
      };
    default:
      return state;
  }
};
