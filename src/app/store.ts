import { configureStore, ThunkAction, Action } from '@reduxjs/toolkit';
import { autorReduser } from '../features/autor/autorReduser';
import { commentsReduser } from '../features/comments/commentsReduser';
// eslint-disable-next-line import/no-cycle
import counterReducer from '../features/counter/counterSlice';
import { postReduser } from '../features/post/postReduser';
import { postsReduser } from '../features/posts/postsReduser';
import { usersReduser } from '../features/users/usersReduser';

export const store = configureStore({
  reducer: {
    counter: counterReducer,
    users: usersReduser,
    posts: postsReduser,
    comments: commentsReduser,
    selectedAutor: autorReduser,
    selectedPost: postReduser,
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
