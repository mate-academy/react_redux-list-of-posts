import React from 'react';
import { useDispatch } from 'react-redux';

import User from './User';
import CommentList from './CommentList';

import { deletePost } from '../store/posts';

type Props = {
  post: PostWithUser;
}

const Post: React.FC<Props> = ({ post }) => {
  const dispatch = useDispatch();

  const deleteSelectedPost = (id: number) => {
    dispatch(deletePost(id))
  }

  return (
    <li className="posts__item">
      <div>
        <h3 className="posts__title">{post.title}</h3>
        <p className="posts__text">
          {post.body}
        </p>
      </div>
      <User user={post.user} />
      <CommentList comments={post.comments} />
      <button
        type="button"
        className="delete-button"
        onClick={() => deleteSelectedPost(post.id)}
      >
        Delete
    </button>
    </li>
  );
}

export default Post;
