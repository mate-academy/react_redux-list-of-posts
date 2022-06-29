import { configureStore, createAction, createReducer } from '@reduxjs/toolkit';
import {
  RootState, Post, User, Comment,
} from '../react-app-env';

export enum ActionType {
  SET_POSTS = 'SET_POSTS',
  SET_USERS = 'SET_USERS',
  SET_COMMENTS = 'SET_COMMENTS',
  SET_CURRENT_USER = 'SET_CURRENT_USER',
  SET_SELECTED_POST_ID = 'SET_SELECTED_POST_ID',
  SET_ISLOADING = 'SET_ISLOADING',
  SET_POST_TITLE = 'SET_POST_TITLE',
}

// Initial state
const initialState: RootState = {
  posts: [],
  users: [],
  comments: [],
  currentUser: '0',
  selectedPostId: 0,
  isLoading: false,
  posttitle: '',
};

export const setUsersAction = createAction<User[]>(ActionType.SET_USERS);
export const setPostsAction = createAction<Post[]>(ActionType.SET_POSTS);
// eslint-disable-next-line max-len
export const setCommentsAction = createAction<Comment[]>(ActionType.SET_COMMENTS);
// eslint-disable-next-line max-len
export const setCurrentUserAction = createAction<string>(ActionType.SET_CURRENT_USER);
// eslint-disable-next-line max-len
export const setSelectedPostIdAction = createAction<number | undefined>(ActionType.SET_SELECTED_POST_ID);
// eslint-disable-next-line max-len
export const setIsLoadingAction = createAction<boolean>(ActionType.SET_ISLOADING);
// eslint-disable-next-line max-len
export const setPostTitleAction = createAction<string>(ActionType.SET_POST_TITLE);

// rootReducer - this function is called after dispatching an action
const reducer = createReducer(initialState, (builder) => {
  builder.addCase(setUsersAction, (state, action) => {
    // eslint-disable-next-line no-param-reassign
    state.users = action.payload;
  });
  builder.addCase(setPostsAction, (state, action) => {
    // eslint-disable-next-line no-param-reassign
    state.posts = action.payload;
  });
  builder.addCase(setCommentsAction, (state, action) => {
    // eslint-disable-next-line no-param-reassign
    state.comments = action.payload;
  });
  builder.addCase(setCurrentUserAction, (state, action) => {
    // eslint-disable-next-line no-param-reassign
    state.currentUser = action.payload;
  });
  builder.addCase(setSelectedPostIdAction, (state, action) => {
    // eslint-disable-next-line no-param-reassign
    state.selectedPostId = action.payload;
  });
  builder.addCase(setIsLoadingAction, (state, action) => {
    // eslint-disable-next-line no-param-reassign
    state.isLoading = action.payload;
  });
  builder.addCase(setPostTitleAction, (state, action) => {
    // eslint-disable-next-line no-param-reassign
    state.posttitle = action.payload;
  });
});

// The `store` should be passed to the <Provider store={store}> in `/src/index.tsx`
export const store = configureStore({
  reducer,
});
