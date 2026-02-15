import { getUserPosts } from '../../api/posts';
import { createAppSlice } from '../../app/createAppSlice';
import { Post } from '../../types/Post';

export interface PostsSliceState {
  posts: Post[];
  loaded: boolean;
  hasError: boolean;
}

const initialState: PostsSliceState = {
  posts: [],
  loaded: false,
  hasError: false,
};

export const postsSlice = createAppSlice({
  name: 'posts',
  initialState,
  reducers: create => ({
    loadUserPosts: create.asyncThunk(
      async (userId: number) => {
        const posts = await getUserPosts(userId);

        return posts;
      },
      {
        pending: state => {
          return {
            ...state,
            loaded: false,
            hasError: false,
          };
        },
        fulfilled: (state, action) => {
          return {
            ...state,
            loaded: true,
            posts: action.payload,
          };
        },
        rejected: state => {
          return {
            ...state,
            loaded: true,
            hasError: true,
          };
        },
      },
    ),
  }),
});
