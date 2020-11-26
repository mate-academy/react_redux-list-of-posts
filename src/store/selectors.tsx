import { RootState } from ".";

export const isLoading = (state: RootState) => state.loading;
export const getUserId = (state: RootState) => state.userId;
export const getPostId = (state: RootState) => state.postId;
export const getpostIdCheck = (state: RootState) => state.postIdCheck;
export const getvisibleComments = (state: RootState) => state.visibleComments;
export const getNewPost = (state: RootState) => state.newPost;
export const getNewComment = (state: RootState) => state.newComment;
export const getNameOfComment = (state: RootState) => state.commentFields.commentName;
export const getEmailOfComment = (state: RootState) => state.commentFields.commentEmail;
export const getBodyOfComment = (state: RootState) => state.commentFields.commentBody;
export const getInputChange = (state: RootState) => state.inputChange;
