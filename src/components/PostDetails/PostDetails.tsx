import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { Comments } from '../Comments';
import { NewCommentForm } from '../NewCommentForm';
import './PostDetails.scss';

import { isLoading, getSelectedPostId, getPost, arePostCommentsHidden } from '../../store';
import { fetchPost } from '../../store/postsReducer';
import { setCommentsHidden } from '../../store/commentsReducer';

import { Post } from '../../types';

export const PostDetails: React.FC = () => {
  const postId = useSelector(getSelectedPostId);
  const post: Post | null = useSelector(getPost);
  const areCommentsHidden: boolean = useSelector(arePostCommentsHidden);
  const loading = useSelector(isLoading);

  const dispatch = useDispatch();

  useEffect(() => {
    if (postId > 0) {
      dispatch(fetchPost(postId));
    }
  }, [postId, dispatch]);

  const toggleDisplayComment = (ev: React.MouseEvent<HTMLButtonElement>) => {
    ev.preventDefault();

    dispatch(setCommentsHidden(!areCommentsHidden));
  };

  return (
    <div className="PostDetails">
      {loading ? (
        <div className="loading"></div>
      ) :
      postId > 0 && post ? (
        <article className="PostDetails__post">
          <h2>{post.title}</h2>
          <p>{post.body}</p>
  
          <div className="PostDetails__post-comments">
            {post.commentsCount > 0 &&
              <button
                type="button"
                className="button"
                onClick={toggleDisplayComment}
              >
                {areCommentsHidden ? 'Show ' : 'Hide '}
                comments
              </button>
            }
  
            {!areCommentsHidden && (
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
        )
      }
    </div>
  );
};
