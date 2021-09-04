import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { Comments } from '../Comments';
import { NewCommentForm } from '../NewCommentForm';
// import { getPostDetails } from '../../helpers/posts';
// import { getPostComments, removePostComment, addPostComment } from '../../api/comments';
import './PostDetails.scss';

import {
  getSelectedPostId,
  getPost,
  getPostComments
} from '../../store'; // isLoading
import {
  fetchPost,
} from '../../store/postsReducer'

import { Post, Comment } from '../../types';

export const PostDetails = () => {
  // const [post, setPost] = useState([]);
  // const [comments, setComments] = useState(null);
  const [commentHidden, setCommentHidden] = useState(false);
  // const [isCommentsUpdated, setCommentsUpdated] = useState(false);
  const postId = useSelector(getSelectedPostId);
  const post: Post = useSelector(getPost);
  const comments: Comment[] | null = useSelector(getPostComments);

  const dispatch = useDispatch();
  // const loading = useSelector(isLoading);

  useEffect(() => {
    if (postId > 0) {
      dispatch(fetchPost(postId));
    }
  }, [postId, dispatch]);

  const toggleDisplayComment = () => {
    setCommentHidden(!commentHidden);
  };

  const postInfo:any = post || {};
  const commentsLength = comments && comments.length;

  return (
    <section className="PostDetails">
      
      {postId ? (
        <>
        <h2>{postInfo.title}</h2>

        <div className="PostDetails__post">
          <p>{postInfo.body}</p>
        </div>

        <div className="PostDetails__comments">
          {!!commentsLength && (
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
        </>
        ) : (
        <p className="info">No post details</p>
      )}
    </section>
  );
};
