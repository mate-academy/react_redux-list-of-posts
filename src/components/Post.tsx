import React from 'react';
import { useDispatch } from 'react-redux';

import CommentsList from './CommentsList';
import UserInfo from './UserInfo';
import { deletePost } from '../store/posts';

type Props = {
  post: Post;
};

const Post: React.FC<Props> = ({ post }) => {
  const {
    id,
    title,
    body,
    comments,
    user,
  } = post;
  const dispatch = useDispatch();

  return (
    <li className="app__post">
      <button
        type="button"
        className="app__delete-button"
        onClick={() => dispatch(deletePost(id))}
      >
        Delete post
      </button>
      <h2 className="app__post-title">
        {title}
      </h2>
      <p className="app__post-text">
        {body}
      </p>
      <UserInfo user={user} />
      {comments && (
        <CommentsList comments={comments} />
      )}
    </li>
  );
};

export default Post;
