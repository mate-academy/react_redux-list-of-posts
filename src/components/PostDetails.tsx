import React, { useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '../app/hooks';
import { fetchPostComments, toggleVisibility } from '../slices/commentsSlice';
import { NewCommentForm } from './NewCommentForm';
import { Loader } from './Loader';
import { Post } from '../types/Post';

type Props = {
  post: Post;
};

export const PostDetails: React.FC<Props> = ({ post }) => {
  const dispatch = useAppDispatch();
  const {
    items: comments,
    loading,
    visible,
  } = useAppSelector(state => state.comments);

  useEffect(() => {
    dispatch(fetchPostComments(post.id));
  }, [dispatch, post.id]);

  return (
    <div>
      <h2 className="title">{`#${post.id}: ${post.title}`}</h2>
      <p>{post.body}</p>

      {loading && <Loader />}
      {!loading && comments.length === 0 && <p>No comments yet</p>}

      {comments.map(comment => (
        <div key={comment.id} className="box comment-box">
          <p>
            <strong>{comment.name}</strong> ({comment.email})
          </p>
          <p>{comment.body}</p>
        </div>
      ))}

      {visible ? (
        <NewCommentForm postId={post.id} />
      ) : (
        <button
          className="button is-link"
          onClick={() => dispatch(toggleVisibility())}
        >
          Write a comment
        </button>
      )}
    </div>
  );
};
