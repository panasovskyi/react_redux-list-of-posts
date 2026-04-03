import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Comment } from '../types/Comment';
import { getPostComments } from '../api/comments';

type InitialState = {
  comments: Comment[];
  loading: boolean;
  error: string;
};

const initialState: InitialState = {
  comments: [],
  loading: false,
  error: '',
};

export const init = createAsyncThunk('comments/fetch', (postid: number) => {
  return getPostComments(postid);
});

const commentsSlice = createSlice({
  name: 'comments',
  initialState,
  reducers: {
    add: (state, action: PayloadAction<Comment>) => {
      state.comments.push(action.payload);
    },

    remove: (state, action: PayloadAction<number>) => {
      state.comments = state.comments.filter(c => c.id !== action.payload);
    },
  },
  extraReducers: builder => {
    builder.addCase(init.fulfilled, (state, action) => {
      state.comments = action.payload;
      state.loading = false;
    });
    builder.addCase(init.pending, state => {
      state.loading = true;
    });
    builder.addCase(init.rejected, state => {
      state.error = 'Error';
      state.loading = false;
    });
  },
});

export default commentsSlice.reducer;
export const { add, remove } = commentsSlice.actions;
