import axios from 'axios';
import {URL_API} from '../../api/const';
import {deleteToken} from '../tokenReducer';

export const AUTH_REQUEST = 'AUTH_REQUEST';
export const AUTH_REQUEST_SUCCESS = 'AUTH_REQUEST_SUCCESS';
export const AUTH_REQUEST_ERROR = 'AUTH_REQUEST_ERROR';

export const authRequest = () => ({
  type: AUTH_REQUEST,
});

export const authRequestSuccess = (data) => ({
  type: AUTH_REQUEST_SUCCESS,
  data,
});

export const authRequestError = (error) => ({
  type: AUTH_REQUEST_ERROR,
  error,
});

export const authRequestAsync = () => (dispath, getState) => {
  const token = getState().token.token;
  if (!token) return;
  dispath(authRequest());
  axios(`${URL_API}/api/v1/me`, {
    headers: {
      Authorization: `bearer ${token}`,
    },
  })
    .then(({data: {name, icon_img: iconImg}}) => {
      const img = iconImg.replace(/\?.*$/, '');
      const data = {name, img};
      dispath(authRequestSuccess(data));
    })
    .catch((err) => {
      console.error(err.message);
      dispath(authRequestError(err.toString()));
      if (err.response.status === 401) {
        dispath(deleteToken());
        setTimeout(() => {
          location.href = '/';
        }, 5000);
      }
    });
};
