import React, { useEffect, useState } from 'react';
import { PostDetailsHeader } from './PostDetailsHeader';

import * as commentsApi from '../api/comments';

import { CommentData } from '../types/Comment';
import { useAppDispatch, useAppSelector } from '../app/hooks';
import {
  setComment,
  removeComment,
  setLoaded,
  setError,
  setComments,
} from '../features/commentsSlice';
import { PostDetailsComment } from './PostDetailsComment';

export const PostDetails: React.FC = () => {
  const dispatch = useAppDispatch();
  const selectedPost = useAppSelector(state => state.selectedPost.selectedPost);
  const { comments, loaded, hasError } = useAppSelector(
    state => state.comments,
  );

  const [visible, setVisible] = useState(false);

  useEffect(() => {
    if (!selectedPost) {
      return;
    }

    dispatch(setLoaded(false));
    dispatch(setError(false));
    setVisible(false);

    commentsApi
      .getPostComments(selectedPost.id)
      .then(commentsFromServer => {
        dispatch(setComments(commentsFromServer));
      })
      .catch(() => dispatch(setError(true)))
      .finally(() => dispatch(setLoaded(true)));
  }, [dispatch, selectedPost]);

  const addComment = async ({ name, email, body }: CommentData) => {
    try {
      const newComment = await commentsApi.createComment({
        name,
        email,
        body,
        postId: selectedPost?.id || 0,
      });

      dispatch(setComment(newComment));
    } catch (error) {
      dispatch(setError(true));
    }
  };

  const deleteComment = async (commentId: number) => {
    dispatch(removeComment(commentId));

    await commentsApi.deleteComment(commentId);
  };

  return (
    <div className="content" data-cy="PostDetails">
      {selectedPost && (
        <>
          <PostDetailsHeader
            id={selectedPost.id}
            title={selectedPost.title}
            body={selectedPost.body}
          />
          <PostDetailsComment
            comments={comments}
            loaded={loaded}
            hasError={hasError}
            visible={visible}
            setVisible={setVisible}
            addComment={addComment}
            deleteComment={deleteComment}
          />
        </>
      )}
    </div>
  );
};
