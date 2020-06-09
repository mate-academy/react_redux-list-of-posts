import React from 'react';
import { useDispatch } from 'react-redux';
import User from './User';
import CommentList from './CommentList';
import './Post.scss';
import { deletePost } from './store/index';

const Post: React.FC<Post> = ({
  title, body, id, user, comments,
}) => {
  const dispatch = useDispatch();

  return (

    <div className="post">
      <button
        type="button"
        className="button__delete"
        onClick={() => dispatch(deletePost(id))}
      >
        Delete Post
      </button>
      <h2 className="post__title">
        {title}
      </h2>

      <User user={user} />
      <p className="post__body">
        {body}
      </p>
      <CommentList comments={comments} />
    </div>
  );
};


export default Post;
