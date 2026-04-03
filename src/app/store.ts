import { configureStore, ThunkAction, Action } from '@reduxjs/toolkit';
// eslint-disable-next-line import/no-cycle
import counterReducer from '../features/counter/counterSlice';
import usersReducer from '../reducers/users';
import userReducer from '../reducers/user';
import postsReducer from '../reducers/posts';
import postReducer from '../reducers/post';
import commentsReducer from '../reducers/comments';

export const store = configureStore({
  reducer: {
    counter: counterReducer,
    users: usersReducer,
    user: userReducer,
    posts: postsReducer,
    post: postReducer,
    comments: commentsReducer,
  },
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;

/* eslint-disable @typescript-eslint/indent */
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;
/* eslint-enable @typescript-eslint/indent */
