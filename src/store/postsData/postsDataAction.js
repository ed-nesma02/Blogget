import axios from 'axios';
import {URL_API} from '../../api/const';
import {postsDataSlice} from './postsDataSlice';
import {createAsyncThunk} from '@reduxjs/toolkit';

export const postsDataRequestAsync = createAsyncThunk(
  'postsData/fetch',
  (newPage, {dispatch, getState}) => {
    let page = getState().postsData.page;
    if (newPage) {
      page = newPage;
      dispatch(postsDataSlice.actions.changePage({page}));
      return;
    }
    const token = getState().token.token;
    const afterPage = getState().postsData.after;
    const isLast = getState().postsData.isLast;
    const search = getState().postsData.search;

    if (!token || isLast) return;

    return axios(
      `${URL_API}/${page}?limit=10${search ? `&q=${search}` : ''}${
        afterPage ? `&after=${afterPage}` : ''
      }`,
      {
        headers: {
          Authorization: `bearer ${token}`,
        },
      }
    )
      .then(
        ({
          data: {
            data: {children: data, after},
          },
        }) => {
          if (afterPage) {
            dispatch(
              postsDataSlice.actions.postsDataRequestSuccessAfter({data, after})
            );
          } else {
            dispatch(
              postsDataSlice.actions.postsDataRequestSuccess({data, after})
            );
          }
        }
      )
      .catch((error) => {
        console.error(error);
        return error;
      });
  }
);
