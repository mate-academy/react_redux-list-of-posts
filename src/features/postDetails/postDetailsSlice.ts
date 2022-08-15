import {
  AsyncThunk,
  createAsyncThunk,
  createSlice,
  PayloadAction,
} from '@reduxjs/toolkit';
import { Post } from '../../types/Post';
import { Comment } from '../../types/Comment';
import type { RootState } from '../../app/store';
import * as commentsApi from '../../api/comments';
import Status from '../../enums/Status';

export interface PostDetailsState {
  selectedPost: Post | null;
  comments: Comment[];
  status: `${Status}`;
}

const initialState: PostDetailsState = {
  selectedPost: null,
  comments: [],
  status: Status.Idle,
};

export const fetchComments = createAsyncThunk(
  'postDetails/fetchComments',
  async (postId: number) => {
    const response = await commentsApi.getPostComments(postId);

    return response;
  },
);

export const addComment = createAsyncThunk(
  'postDetails/addComment',
  async (data: Omit<Comment, 'id'>) => {
    const response = await commentsApi.createComment(data);

    return response;
  },
);

export const deleteComment = createAsyncThunk(
  'postDetails/deleteComment',
  async (commentId: number) => {
    await commentsApi.deleteComment(commentId);

    return commentId;
  },
);

type GenericAsyncThunk = AsyncThunk<unknown, unknown, any>;

type PendingAction = ReturnType<GenericAsyncThunk['pending']>;
type RejectedAction = ReturnType<GenericAsyncThunk['rejected']>;
type FulfilledAction = ReturnType<GenericAsyncThunk['fulfilled']>;

export const postDetailsSlice = createSlice({
  name: 'postDetails',
  initialState,
  reducers: {
    selectPost: (state, action: PayloadAction<Post | null>) => {
      state.selectedPost = action.payload;
    },
    setComments: (state, action: PayloadAction<Comment[]>) => {
      state.comments = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(
        fetchComments.fulfilled,
        (state, action: PayloadAction<Comment[]>) => {
          state.comments = action.payload;
        },
      )
      .addCase(
        addComment.fulfilled,
        (state, action: PayloadAction<Comment>) => {
          state.comments = state.comments.concat(action.payload);
        },
      )
      .addCase(
        deleteComment.fulfilled,
        (state, action: PayloadAction<number>) => {
          state.comments
          = state.comments.filter(comment => comment.id !== action.payload);
        },
      )
      .addMatcher<FulfilledAction>(
      (action) => action.type.endsWith('/fulfilled'),
      (state) => {
        state.status = Status.Idle;
      },
    )
      .addMatcher<PendingAction>(
      (action) => action.type.endsWith('/pending'),
      (state) => {
        state.status = Status.Loading;
      },
    )
      .addMatcher<RejectedAction>(
      (action) => action.type.endsWith('/rejected'),
      (state) => {
        state.status = Status.Failed;
      },
    );
  },
});

export const { selectPost, setComments } = postDetailsSlice.actions;

export const postDetails = (state: RootState) => (
  state.postDetails
);

export default postDetailsSlice.reducer;
