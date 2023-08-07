import { configureStore, ThunkAction, Action } from '@reduxjs/toolkit';
// eslint-disable-next-line import/no-cycle
import userReducer from '../features/users/usersAPI';
import postReducer from '../features/postAPI';
import commentsReduser from '../features/commentsAPI';
import currentUserReducer from '../features/currentUser';
import selectPostReduser from '../features/selectPost';

export const store = configureStore({
  reducer: {
    users: userReducer,
    currentUser: currentUserReducer,
    posts: postReducer,
    comments: commentsReduser,
    selectPost: selectPostReduser,
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
export const selectUsers = (state: RootState) => state.users;
export const selectCurrentUser = (state: RootState) => state.currentUser;
export const takeSelectPost = (state: RootState) => state.selectPost;
export const selectComment = (state: RootState) => state.comments;
export const Posts = (state: RootState) => state.posts;
