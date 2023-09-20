import axios from 'axios';
import {URL_API} from '../../api/const';

export const POSTS_DATA_REQUEST = 'POSTS_DATA_REQUEST';
export const POSTS_DATA_REQUEST_SUCCESS = 'POSTS_DATA_REQUEST_SUCCESS';
export const POSTS_DATA_REQUEST_ERROR = 'POSTS_DATA_REQUEST_ERROR';

export const postsDataRequest = () => ({
  type: POSTS_DATA_REQUEST,
});

export const postsDataRequestSuccess = (data) => ({
  type: POSTS_DATA_REQUEST_SUCCESS,
  data,
});

export const postsDataRequestError = (error) => ({
  type: POSTS_DATA_REQUEST_ERROR,
  error,
});

export const postsDataRequestAsync = () => (dispath, getState) => {
  const token = getState().token.token;
  dispath(postsDataRequest());
  if (!token) return;

  axios(`${URL_API}/best`, {
    headers: {
      Authorization: `bearer ${token}`,
    },
  })
    .then(({data: {data}}) => {
      dispath(postsDataRequestSuccess(data?.children));
    })
    .catch((err) => {
      console.error(err);
      dispath(postsDataRequestError(err));
    });
};
