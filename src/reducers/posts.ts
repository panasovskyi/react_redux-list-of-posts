import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { Post } from '../types/Post';
import { getUserPosts } from '../api/posts';

type InitialState = {
  loading: boolean;
  error: string;
  posts: Post[];
};

const initialState: InitialState = {
  loading: false,
  error: '',
  posts: [],
};

export const init = createAsyncThunk('posts/fetch', (id: number) => {
  return getUserPosts(id);
});

const postsSlice = createSlice({
  name: 'posts',
  initialState,
  reducers: {},
  extraReducers: builder => {
    builder.addCase(init.pending, state => {
      state.loading = true;
    });
    builder.addCase(init.rejected, state => {
      state.error = 'Error';
      state.loading = false;
    });
    builder.addCase(init.fulfilled, (state, action) => {
      state.loading = false;
      state.posts = action.payload;
    });
  },
});

export default postsSlice.reducer;
