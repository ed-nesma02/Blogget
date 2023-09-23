import {createSlice} from '@reduxjs/toolkit';

const initialState = {
  status: 'idle',
  data: [],
  error: '',
  after: '',
  isLast: '',
  page: '',
};

export const postsDataSlice = createSlice({
  name: 'postsData',
  initialState,
  reducers: {
    postsDataRequest: (state) => {
      state.status = 'loading';
      state.error = '';
    },
    postsDataRequestSuccess: (state, action) => {
      state.status = 'loaded';
      state.data = action.payload.data;
      state.error = '';
      state.after = action.payload.after;
      state.isLast = !action.payload.after;
    },
    postsDataRequestSuccessAfter: (state, action) => {
      state.status = 'loaded';
      state.data = [...state.data, ...action.payload.data];
      state.error = '';
      state.after = action.payload.after;
      state.isLast = !action.payload.after;
    },
    postsDataRequestError: (state, action) => {
      state.status = 'error';
      state.error = action.error;
    },
    changePage: (state, action) => {
      state.page = action.payload.page;
      state.after = '';
      state.isLast = false;
    },
  },
});

export default postsDataSlice.reducer;