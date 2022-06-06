import {
  getAllPosts, getPostDetails, getUserPosts, deletePost,
} from '../../helpers/posts';
import { AppDispatch } from '../store';
import { postsSlice } from './PostSlice';
import { Post } from '../../types/Post';
import { Comment } from '../../types/Comment';
import {
  addPostComment, deletePostComment, getPostComments,
} from '../../helpers/comments';
import { commentSlice } from './CommentSlice';

export const loadPosts = () => async (dispatch: AppDispatch) => {
  try {
    dispatch(postsSlice.actions.postsLoading());
    const jsonData = await getAllPosts();

    dispatch(postsSlice.actions.postsLoadSuccess(jsonData));
  } catch (error) {
    dispatch(postsSlice.actions.postsLoadError());
  }
};

export const loadUserPosts = (id: number) => async (dispatch: AppDispatch) => {
  try {
    dispatch(postsSlice.actions.postsLoading());
    const jsonData = await getUserPosts(id);

    dispatch(postsSlice.actions.postsLoadSuccess(jsonData));
  } catch (error) {
    dispatch(postsSlice.actions.postsLoadError());
  }
};

export const getComments = (id: number) => async (dispatch: AppDispatch) => {
  const jsonData = await getPostComments(id);

  dispatch(commentSlice.actions.commentsLoad(jsonData));
};

export const openPost = (id: number) => async (dispatch: AppDispatch) => {
  try {
    dispatch(postsSlice.actions.postDetailLoading());
    const jsonData = await getPostDetails(id);

    dispatch(getComments(id));

    dispatch(postsSlice.actions.postDetailLoadSuccess(jsonData));
  } catch (error) {
    dispatch(postsSlice.actions.postDetailLoadError());
  }
};

export const removePost = (id: number, posts: Post[]) => async (
  dispatch: AppDispatch,
) => {
  await deletePost(id);
  dispatch(postsSlice.actions.deletePost(posts));
};

export const removeComment = (id: number, comments: Comment[]) => async (
  dispatch: AppDispatch,
) => {
  await deletePostComment(id);

  dispatch(commentSlice.actions.deleteComment(comments));
};

export const createComment = (
  comment: Omit<Comment, 'id'>, id: number,
) => async (
  dispatch: AppDispatch,
) => {
  await addPostComment(comment);
  const jsonData = await getPostComments(id);

  dispatch(commentSlice.actions.createComment(jsonData));
};
