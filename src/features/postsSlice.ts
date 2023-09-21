import { createSlice, Dispatch, PayloadAction } from '@reduxjs/toolkit';
import { Post } from '../types/Post';
import { getUserPosts } from '../api/posts';

export interface PostsState {
  posts: Post[];
  loaded: boolean;
  hasError: boolean;
}

const initialState: PostsState = {
  posts: [],
  loaded: false,
  hasError: false,
};

const postsSlice = createSlice({
  name: 'posts',
  initialState,
  reducers: {
    addPosts: (state, action: PayloadAction<Post[]>) => {
      return {
        ...state,
        posts: action.payload,
      };
    },
    clearPosts: (state) => {
      return {
        ...state,
        posts: [],
      };
    },
    setLoaded: (state, action: PayloadAction<boolean>) => {
      return {
        ...state,
        loaded: action.payload,
      };
    },
    setError: (state, action: PayloadAction<boolean>) => {
      return {
        ...state,
        hasError: action.payload,
      };
    },
  },
});

export default postsSlice.reducer;
export const {
  addPosts,
  clearPosts,
  setLoaded,
  setError,
} = postsSlice.actions;

export const loadUserPosts = (userId: number) => {
  return async (dispatch: Dispatch) => {
    dispatch(setLoaded(false));

    try {
      const response = await getUserPosts(userId);

      dispatch(addPosts(response));
    } catch {
      dispatch(setError(true));
    } finally {
      dispatch(setLoaded(true));
    }
  };
};
