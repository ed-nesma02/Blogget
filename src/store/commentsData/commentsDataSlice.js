import {createSlice} from '@reduxjs/toolkit';
import {commentsDataAsync} from './commentsDataAction';

const initialState = {
  status: 'idle',
  dataPost: {},
  comments: [],
  error: '',
};

export const commentsSlice = createSlice({
  name: 'commentsData',
  initialState,
  reducers: {},
  extraReducers: {
    [commentsDataAsync.pending.type]: (state) => {
      state.error = '';
      state.status = 'loading';
    },
    [commentsDataAsync.fulfilled.type]: (state, action) => {
      state.status = 'loaded';
      state.dataPost = action.payload.dataPost;
      state.comments = action.payload.comments;
      state.error = '';
    },
    [commentsDataAsync.rejected.type]: (state, action) => {
      state.status = 'error';
      state.error = action.error;
    },
  },
});

export default commentsSlice.reducer;
