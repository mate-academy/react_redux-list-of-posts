import React from 'react';
import { useDispatch } from 'react-redux';
import User from '../User/User';
import CommentList from '../CommentList';
import './Post.css';
import { deletePosts } from '../../store/posts';

interface Props {
  post: Post;
}

const Post: React.FC<Props> = ({
  post: {
    id, title, body, user, userComments,
  },
}) => {
  const dispatch = useDispatch();

  return (

    <div className="post">
      <button
        className="btn bnt__post"
        type="button"
        onClick={() => dispatch(deletePosts(id))}
      >
        <i className="fa fa-trash" />
      </button>

      <h3 className="post__title">
        {title}
      </h3>
      <p className="post__body">
        {body}
      </p>
      <User user={user} />
      <CommentList userComments={userComments} postId={id} />
    </div>
  );
};

export default Post;
