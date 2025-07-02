import * as commentsApi from '../api/comments';
import { useEffect, useState } from 'react';
import { CommentData } from '../types/Comment';
import { useAppDispatch, useAppSelector } from '../app/hooks';
import * as commentsActions from '../features/commentsSlice';

export const usePostDetails = () => {
  const dispatch = useAppDispatch();
  const {
    loaded,
    hasError,
    items: comments,
  } = useAppSelector(state => state.comments);
  const { selectedPost: post } = useAppSelector(state => state.selectedPost);
  const selectedPostId = post?.id;

  const [visible, setVisible] = useState(false);

  function loadComments() {
    setVisible(false);
    if (selectedPostId !== undefined) {
      dispatch(commentsActions.init(selectedPostId));
    }
  }

  useEffect(loadComments, [selectedPostId, dispatch]);
  if (selectedPostId === undefined) {
    return;
  }

  const addComment = async ({ name, email, body }: CommentData) => {
    const newComment = await commentsApi.createComment({
      name,
      email,
      body,
      postId: selectedPostId,
    });

    dispatch(commentsActions.addComment(newComment));
  };

  const deleteComment = async (commentId: number) => {
    dispatch(commentsActions.deleteComment(commentId));

    try {
      await commentsApi.deleteComment(commentId);
    } catch (error) {}
  };

  return {
    loaded,
    hasError,
    comments,
    post,
    visible,
    addComment,
    deleteComment,
  };
};
