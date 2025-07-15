import { configureStore, ThunkAction, Action } from '@reduxjs/toolkit';
// eslint-disable-next-line import/no-cycle
import counterReducer from '../features/counter/counterSlice';
import usersReducer from '../features/UsersSlice';
import currentAuthorReducer from '../features/CurrentAuthorSlice';
import postsReducer from '../features/PostsSlice';
import selectedPostReducer from '../features/SelectedPostSlice';
import commentsReducer from '../features/CommentsSlice';
import newCommentFormReducer from '../features/NewCommentFormSlice';

export const store = configureStore({
  reducer: {
    counter: counterReducer,
    users: usersReducer,
    currentAuthor: currentAuthorReducer,
    posts: postsReducer,
    selectedPost: selectedPostReducer,
    comments: commentsReducer,
    newCommentForm: newCommentFormReducer,
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
