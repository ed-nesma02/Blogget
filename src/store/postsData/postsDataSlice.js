import {createSlice} from '@reduxjs/toolkit';
import {postsDataRequestAsync} from './postsDataAction';

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
