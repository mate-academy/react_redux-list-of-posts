/* eslint-disable max-len */
import { configureStore, ThunkAction, Action } from '@reduxjs/toolkit';
// eslint-disable-next-line import/no-cycle
import { usersReducer } from '../features/usersSlice';
import { selectedUserReducer } from '../features/selectedUser';
import { postsReducer } from '../features/postsSlice';
import { loadPostOnUserSelect } from '../features/middleware/loadPostsOnUserSelect';
import { loadCommentsOnPostSelect } from '../features/middleware/loadCommentsOnPostSelection';
import { selectedPostReducer } from '../features/selectedPost';
import { commentsReducer } from '../features/commentsSlice';
import { deselectPostOnUserChange } from '../features/middleware/deselectPostOnUserChange';
// eslint-enable-next-line import/no-cycle

export const store = configureStore({
  reducer: {
    users: usersReducer,
    posts: postsReducer,
    selectedUser: selectedUserReducer,
    selectedPost: selectedPostReducer,
    comments: commentsReducer,
  },
  middleware: getDefaultMiddleware =>
    getDefaultMiddleware().concat(
      loadPostOnUserSelect,
      loadCommentsOnPostSelect,
      deselectPostOnUserChange,
    ),
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
