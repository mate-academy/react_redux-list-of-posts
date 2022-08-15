import {
  configureStore,
} from '@reduxjs/toolkit';

import postsListReducer from '../features/postsList/postsListSlice';
import userSelectorReducer from '../features/userSelector/userSelectorSlice';
import postDetailsReducer from '../features/postDetails/postDetailsSlice';
import newCommentFormReducer
  from '../features/newCommentForm/newCommentFormSlice';

export const store = configureStore({
  reducer: {
    posts: postsListReducer,
    users: userSelectorReducer,
    postDetails: postDetailsReducer,
    newCommentForm: newCommentFormReducer,
  },
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
