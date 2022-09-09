import { configureStore, ThunkAction, Action } from '@reduxjs/toolkit';
// eslint-disable-next-line import/no-cycle
import { usersApi } from './api/users';
import { postsApi } from './api/posts';
import { commentsByPostIdApi } from './api/commentsByPostId';
import { postByIdApi } from './api/postById';

export const store = configureStore({
  reducer: {
    users: usersApi.reducer,
    postsByUserId: postsApi.reducer,
    commentsByPostId: commentsByPostIdApi.reducer,
    postById: postByIdApi.reducer,
  },
  middleware: (getDefaultMiddleware) => {
    return getDefaultMiddleware()
      .concat(usersApi.middleware)
      .concat(postsApi.middleware)
      .concat(commentsByPostIdApi.middleware)
      .concat(postByIdApi.middleware);
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
