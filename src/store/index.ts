import {
  configureStore,
  createAction,
  createReducer,
  createAsyncThunk,
} from '@reduxjs/toolkit';
import {
  RootState, Post,
} from '../react-app-env';
import { getAllUsers } from '../api/api';
import { getAllPosts } from '../api/posts';
import { getComments } from '../api/comments';

export enum ActionType {
  SET_POSTS = 'SET_POSTS',
  SET_ALL_POSTS = 'SET_ALL_POSTS',
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
  selectedUserId: '0',
  selectedPostId: 0,
  isLoading: false,
  posttitle: '',
};

export const setPostsAction = createAction<Post[]>(ActionType.SET_POSTS);
// eslint-disable-next-line max-len
export const setCurrentUserAction = createAction<string>(ActionType.SET_CURRENT_USER);
// eslint-disable-next-line max-len
export const setSelectedPostIdAction = createAction<number | undefined>(ActionType.SET_SELECTED_POST_ID);
// eslint-disable-next-line max-len
export const setIsLoadingAction = createAction<boolean>(ActionType.SET_ISLOADING);
// eslint-disable-next-line max-len
export const setPostTitleAction = createAction<string>(ActionType.SET_POST_TITLE);

export const loadUsers = createAsyncThunk(ActionType.SET_USERS, async () => {
  const usersFromServer = await getAllUsers();

  return usersFromServer;
});

export const loadAllPosts = createAsyncThunk(
  ActionType.SET_ALL_POSTS, async () => {
    const postsFromServer = await getAllPosts();

    return postsFromServer;
  },
);

export const loadComments = createAsyncThunk(
  ActionType.SET_COMMENTS, async (id: number | undefined) => {
    const commentsFromServer = await getComments(id);

    return commentsFromServer;
  },
);

// rootReducer - this function is called after dispatching an action
const reducer = createReducer(initialState, (builder) => {
  builder.addCase(setPostsAction, (state, action) => {
    // eslint-disable-next-line no-param-reassign
    state.posts = action.payload;
  });

  builder.addCase(setCurrentUserAction, (state, action) => {
    // eslint-disable-next-line no-param-reassign
    state.selectedUserId = action.payload;
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
  builder.addCase(loadUsers.pending, (state) => {
    // eslint-disable-next-line no-param-reassign
    state.isLoading = true;
  });

  builder.addCase(loadUsers.fulfilled, (state, action) => {
    // eslint-disable-next-line no-param-reassign
    state.users = action.payload;
    // eslint-disable-next-line no-param-reassign
    state.isLoading = false;
  });

  builder.addCase(loadAllPosts.pending, (state) => {
    // eslint-disable-next-line no-param-reassign
    state.isLoading = true;
  });

  builder.addCase(loadAllPosts.fulfilled, (state, action) => {
    // eslint-disable-next-line no-param-reassign
    state.posts = action.payload;
    // eslint-disable-next-line no-param-reassign
    state.isLoading = false;
  });

  builder.addCase(loadComments.pending, (state) => {
    // eslint-disable-next-line no-param-reassign
    state.isLoading = true;
  });

  builder.addCase(loadComments.fulfilled, (state, action) => {
    // eslint-disable-next-line no-param-reassign
    state.comments = action.payload;
    // eslint-disable-next-line no-param-reassign
    state.isLoading = false;
  });
});

// The `store` should be passed to the <Provider store={store}> in `/src/index.tsx`
export const store = configureStore({
  reducer,
});
// type of dispath, dispatch can get async function
export type AppDispatch = typeof store.dispatch;
