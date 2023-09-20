import {
  COMMENTS_DATA_REQUEST,
  COMMENTS_DATA_REQUEST_ERROR,
  COMMENTS_DATA_REQUEST_SUCCESS,
} from './commentsDataAction';

const initialState = {
  status: 'idle',
  dataPost: {},
  comments: [],
  error: '',
};

export const commentsDataReducer = (state = initialState, action) => {
  switch (action.type) {
    case COMMENTS_DATA_REQUEST:
      return {
        ...state,
        status: 'loading',
      };
    case COMMENTS_DATA_REQUEST_SUCCESS:
      return {
        ...state,
        status: 'loaded',
        dataPost: action.dataPost,
        comments: action.comments,
        error: '',
      };
    case COMMENTS_DATA_REQUEST_ERROR:
      return {
        ...state,
        status: 'error',
        error: action.error,
      };
    default:
      return state;
  }
};
