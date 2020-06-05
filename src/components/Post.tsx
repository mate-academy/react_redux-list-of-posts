import React from 'react';
import { useDispatch } from 'react-redux';
import User from './User';
import './Post.scss';
import CommentsList from './CommentsList';
import { REMOVE_POST } from '../store/actionTypes';

type Props = {
  post: Post;
};

const Post: React.FunctionComponent<Props> = ({ post }) => {
  const dispatch = useDispatch();

  return (
    <article className="post">
      <button
        type="button"
        onClick={() => dispatch({ type: REMOVE_POST, postId: post.id })}
        className="button"
      >
        Remove
      </button>
      <h2 className="post__title">{post.title}</h2>
      <p className="post__text">{post.body}</p>
      <User user={post.user} />
      <CommentsList comments={post.comments} />
    </article>
  );
};

export default Post;
