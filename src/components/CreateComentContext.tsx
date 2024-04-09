// import { PayloadAction, createAsyncThunk, createSlice } from '@reduxjs/toolkit';
// import { Comment } from '../types/Comment';
// import { deleteComment } from '../api/comments';

// export type NewCommentPost = {
//   name: string;
//   email: string;
//   comment: string;
// };

// const initialState: NewCommentPost = {
//   name: '',
//   email: '',
//   comment: '',
// };

// export const CommentsContext = createSlice({
//   name: 'createComment',
//   initialState,
//   reducers: {
//     setName: (state, action) => {
//       state.name = action.payload;
//     },
//     setEmail(state, action) {
//       state.email = action.payload;
//     },
//     setComent(state, action) {
//       state.comment = action.payload;
//     }
//   },
//   // extraReducers: builder => {
//     // builder.addCase(deleteSelectedComment.pending, state => {
//     //   state.loading = true;
//     // });
//     // builder.addCase(deleteSelectedComment.fulfilled, (state, action) => {
//     //   state. = action.payload;
      
//     // });
//     // builder.addCase(deleteSelectedComment.rejected, state => {
//     //   state.loading = false;
//     //   state.error = 'Error';
//     // });
//   // },
// });

// export const {  setName, setEmail, setComent } = CommentsContext.actions;
// export default CommentsContext.reducer;

// // type DeleteSelectedCommentType = (postId: number) => void;

// export const createComment = createAsyncThunk<Comment[]>('/create', (obj: Comment) => {
//     return createComment(selectedComment);
//   }
// );