import {createAsyncThunk, createSlice, PayloadAction} from "@reduxjs/toolkit";
import {Comment} from "../types/Comment";
import {Post} from "../types/Post";
import {deleteComment, getPostComments} from "../api/comments";
import {client} from "../utils/fetchClient";


export type currentPostState = {
  currentPost: Post | null,
  currentPostLoading: boolean,
  comments: Comment[],
  commentsLoading: boolean,
  commentsError: string,
  currentPostError: string,
  formVisibility: boolean,
};

const initialState: currentPostState = {
  currentPost: null,
  currentPostLoading: false,
  comments: [],
  commentsLoading: false,
  commentsError: '',
  currentPostError: '',
  formVisibility: false,
}

const currentPostSlice = createSlice({
  name: 'currentPost',
  initialState,
  reducers: {
    setCurrentPost: (state, action: PayloadAction<Post | null>) => {
      state.currentPost = action.payload;
    },
    removeComment: (state, action: PayloadAction<number>) => {
      state.comments = state.comments.filter(comment => comment.id !== action.payload);
    },
    setFormVisibility: (state, action: PayloadAction<boolean>) => {
      state.formVisibility = action.payload
    },
  },
  extraReducers: (builder) => {
    builder.addCase(postCommentsInit.pending, (state) => {
      state.currentPostLoading = true;
    })
    .addCase(postCommentsInit.fulfilled, (state, action) => {
      if(action.payload) {
        state.comments = action.payload;
        state.currentPostLoading = false;
      }
    })
    .addCase(postCommentsInit.rejected, (state) => {
      state.currentPostError = 'error';
      state.currentPostLoading = false;
    });

    builder.addCase(commentRemoveInit.pending, state => {
      state.commentsError = '';
    })
    .addCase(commentRemoveInit.rejected, (state) => {
      state.commentsError = 'error';
    });

    builder.addCase(addCommentInit.pending, (state) => {
      state.commentsLoading = true;

    })
    .addCase(addCommentInit.fulfilled, (state, action) => {
      state.commentsLoading = false;
      state.formVisibility = false;
      // Додавання нового коментаря до масиву comments
      state.comments.push(action.payload);
    })
    .addCase(addCommentInit.rejected, (state, action) => {
      state.commentsLoading = false;
      state.commentsError = action.payload as string;
    });
  }
});

export default currentPostSlice.reducer;
export const { actions } = currentPostSlice;

export const postCommentsInit = createAsyncThunk('postComments/fetch', (postId: number) => {
  return getPostComments(postId);
});

export const commentRemoveInit = createAsyncThunk('post/remove', (postId: number) => {
  return deleteComment(postId);
});

export const addCommentInit = createAsyncThunk<Comment, Omit<Comment, 'id'>>('comment/add', async (commentData, thunkAPI) => {
  try {
    const response = await client.post<Comment>('/comments', commentData);
    return response;
  } catch (error) {
    return thunkAPI.rejectWithValue(error);
  }
});
