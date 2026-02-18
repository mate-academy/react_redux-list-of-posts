import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Post } from '../types/Post';
import { getUserPosts } from '../api/posts';
import { AppDispatch } from '../app/store';

type PostsState = {
  posts: Post[];
  loaded: boolean;
  hasError: boolean;
};

const initialState: PostsState = {
  posts: [],
  loaded: false,
  hasError: false,
};

export const PostsSlice = createSlice({
  name: 'posts',
  initialState,
  reducers: {
    setPosts(state, action: PayloadAction<Post[]>) {
      return {
        ...state,
        posts: action.payload,
      };
    },
    setLoaded(state, action: PayloadAction<boolean>) {
      return {
        ...state,
        loaded: action.payload,
      };
    },
    setHasError(state, action: PayloadAction<boolean>) {
      return {
        ...state,
        hasError: action.payload,
      };
    },
  },
});

export const { setPosts, setLoaded, setHasError } = PostsSlice.actions;
export default PostsSlice.reducer;

export const loadUserPosts =
  (userId: number) => async (dispatch: AppDispatch) => {
    dispatch(setLoaded(false));
    dispatch(setHasError(false));

    try {
      const posts = await getUserPosts(userId);

      dispatch(setPosts(posts));
    } catch {
      dispatch(setHasError(true));
    } finally {
      dispatch(setLoaded(true));
    }
  };
