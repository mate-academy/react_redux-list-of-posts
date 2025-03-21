/* eslint-disable @typescript-eslint/no-explicit-any */
import { configureStore } from '@reduxjs/toolkit';
import postsReducer, { PostsState } from '../features/postsSlice';
import selectedPostReducer, {
  SelectedPostState,
} from '../features/selectedPostSlice';

export interface RootState {
  author: any;
  posts: PostsState;
  selectedPost: SelectedPostState;
}

export const store = configureStore({
  reducer: {
    posts: postsReducer,
    selectedPost: selectedPostReducer,
  },
});

export type AppDispatch = typeof store.dispatch;

/* eslint-disable @typescript-eslint/indent */
// export type AppThunk<ReturnType = void> = ThunkAction<
//   ReturnType,
//   RootState,
//   unknown,
//   Action<string>
// >;
/* eslint-enable @typescript-eslint/indent */
