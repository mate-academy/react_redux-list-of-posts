import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { Comments } from '../Comments';
import { NewCommentForm } from '../NewCommentForm';
import './PostDetails.scss';

import { getSelectedPostId, getPost, getPostComments } from '../../store'; // isLoading
import { fetchPost } from '../../store/postsReducer';

import { Post } from '../../types';

export const PostDetails: React.FC = () => {
  const [commentHidden, setCommentHidden] = useState(false);
  const postId = useSelector(getSelectedPostId);
  const post: Post | null = useSelector(getPost);
  const comments = useSelector(getPostComments);

  const dispatch = useDispatch();

  useEffect(() => {
    if (postId > 0) {
      dispatch(fetchPost(postId));
    }
  }, [postId, dispatch]);

  const toggleDisplayComment = (ev: React.MouseEvent<HTMLButtonElement>) => {
    ev.preventDefault();

    setCommentHidden(!commentHidden);
  };

  return (
    <div className="PostDetails">
      
      {postId > 0 && post ? (
        <article className="PostDetails__post">
          <h2>{post.title}</h2>
          <p>{post.body}</p>

          <div className="PostDetails__post-comments">
            {comments && (
              <button
                type="button"
                className="button"
                onClick={toggleDisplayComment}
              >
                {commentHidden ? 'Show ' : 'Hide '}
                comments
              </button>
            )}

            {!commentHidden && (
              <Comments postId={postId} />
            )}
            <div className="PostDetails__form-wrapper">
              <NewCommentForm
                postId={postId}
              />
            </div>
          </div>
        </article>
        ) : (
        <p className="info">No post details</p>
      )}
    </div>
  );
};
