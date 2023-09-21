import axios from 'axios';
import {URL_API} from '../../api/const';

export const POSTS_DATA_REQUEST = 'POSTS_DATA_REQUEST';
export const POSTS_DATA_REQUEST_SUCCESS = 'POSTS_DATA_REQUEST_SUCCESS';
export const POSTS_DATA_REQUEST_ERROR = 'POSTS_DATA_REQUEST_ERROR';
export const POSTS_DATA_REQUEST_SUCCESS_AFTER =
  'POSTS_DATA_REQUEST_SUCCESS_AFTER';
export const CHANGE_PAGE = 'CHANGE_PAGE';

export const postsDataRequest = () => ({
  type: POSTS_DATA_REQUEST,
});

export const postsDataRequestSuccess = (data) => ({
  type: POSTS_DATA_REQUEST_SUCCESS,
  data: data.children,
  after: data.after,
});

export const postsDataRequestSuccessAfter = (data) => ({
  type: POSTS_DATA_REQUEST_SUCCESS_AFTER,
  data: data.children,
  after: data.after,
});

export const postsDataRequestError = (error) => ({
  type: POSTS_DATA_REQUEST_ERROR,
  error,
});

export const changePage = (page) => ({
  type: CHANGE_PAGE,
  page,
});

export const postsDataRequestAsync = (newPage) => (dispath, getState) => {
  let page = getState().postsData.page;
  if (newPage) {
    page = newPage;
    dispath(changePage(page));
  }
  const token = getState().token.token;
  const after = getState().postsData.after;
  const status = getState().postsData.status;
  const isLast = getState().postsData.isLast;

  if (!token || status === 'loading' || isLast) return;
  if (!after) {
    dispath(postsDataRequest());
  }

  axios(`${URL_API}/${page}?limit=10&${after ? `after=${after}` : ''}`, {
    headers: {
      Authorization: `bearer ${token}`,
    },
  })
    .then(({data: {data}}) => {
      if (after) {
        dispath(postsDataRequestSuccessAfter(data));
      } else {
        dispath(postsDataRequestSuccess(data));
      }
    })
    .catch((err) => {
      console.error(err);
      dispath(postsDataRequestError(err));
    });
};
