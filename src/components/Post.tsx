import React from 'react';
import { useDispatch } from 'react-redux';

import { CommentList } from './CommentList';
import { User } from './User';

import { setDeletePost } from '../store/posts';

type Props = {
  post: PostType;
};

export const Post: React.FC<Props> = ({ post }) => {
  const dispatch = useDispatch();

  const deleteSelectedPost = (id: number) => {
    dispatch(setDeletePost(id));
  };

  return (
    <li className="post__item">
      <div className="post__article">
        <h3 className="post__title">
          {post.title}
        </h3>
        <button
          type="button"
          className="post__delete-button"
          onClick={() => deleteSelectedPost(post.id)}
        >
          Delete
        </button>
        <p className="post__text">
          {post.body}
        </p>
      </div>
      <User user={post.user} />
      <hr />
      <h3>Comments:</h3>
      <CommentList comments={post.comments} />
    </li>
  );
};
