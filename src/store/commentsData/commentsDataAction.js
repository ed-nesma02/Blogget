import axios from 'axios';
import {URL_API} from '../../api/const';

export const COMMENTS_DATA_REQUEST = 'COMMENTS_DATA_REQUEST';
export const COMMENTS_DATA_REQUEST_SUCCESS = 'COMMENTS_DATA_REQUEST_SUCCESS';
export const COMMENTS_DATA_REQUEST_ERROR = 'COMMENTS_DATA_REQUEST_ERROR';

export const commentsDataRequest = () => ({
  type: COMMENTS_DATA_REQUEST,
});

export const commentsDataRequestSuccess = (dataPost, comments) => ({
  type: COMMENTS_DATA_REQUEST_SUCCESS,
  dataPost,
  comments,
});

export const commentsDataRequestError = (error) => ({
  type: COMMENTS_DATA_REQUEST_ERROR,
  error,
});

export const commentsDataAsync = (id) => (dispath, getState) => {
  const token = getState().token.token;
  dispath(commentsDataRequest());
  if (!token) return;

  axios(`${URL_API}/comments/${id}`, {
    headers: {
      Authorization: `bearer ${token}`,
    },
  })
    .then(({data}) => {
      dispath(
        commentsDataRequestSuccess(
          data[0]?.data.children[0]?.data,
          data[1]?.data.children
        )
      );
    })
    .catch((err) => {
      console.error(err);
      dispath(commentsDataRequestError(err));
    });
};
