import {createSlice} from '@reduxjs/toolkit';
import {postsDataRequestAsync} from './postsDataAction';

const initialState = {
  status: 'idle',
  data: [],
  error: '',
  after: '',
  isLast: '',
  page: '',
  search: '',
};

export const postsDataSlice = createSlice({
  name: 'postsData',
  initialState,
  reducers: {
    postsDataRequestSuccess(state, action) {
      state.status = 'loaded';
      state.data = action.payload.data;
      state.error = '';
      state.after = action.payload.after;
      state.isLast = !action.payload.after;
    },
    postsDataRequestSuccessAfter(state, action) {
      state.status = 'loaded';
      state.data = [...state.data, ...action.payload.data];
      state.error = '';
      state.after = action.payload.after;
      state.isLast = !action.payload.after;
    },
    changePage(state, action) {
      state.page = action.payload.page;
      state.after = '';
      state.isLast = false;
    },
    searchRequest(state, action) {
      state.status = 'loading';
      state.error = '';
      state.search = action.payload.search;
    },
    searchRequestSuccess(state, action) {
      state.status = 'loaded';
      state.data = action.payload.data;
      state.error = '';
      state.after = action.payload.after;
      state.isLast = !action.payload.after;
    },
    searchRequestSuccessAfter(state, action) {
      state.status = 'loaded';
      state.data = [...state.data, ...action.payload.data];
      state.error = '';
      state.after = action.payload.after;
      state.isLast = !action.payload.after;
    },
    searchRequestError(state, action) {
      state.status = 'loaded';
      state.error = action.payload.error;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(postsDataRequestAsync.pending, (state) => {
        state.status = 'loading';
        state.error = '';
      })
      .addCase(postsDataRequestAsync.rejected, (state, action) => {
        state.status = 'error';
        state.error = action.error;
      });
  },
});

export default postsDataSlice.reducer;
