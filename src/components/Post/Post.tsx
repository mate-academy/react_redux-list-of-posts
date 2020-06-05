import React, { Dispatch } from 'react';
import { useDispatch } from 'react-redux';
import { AllActions, deletePost } from '../../store';
import './Post.scss';

type Props = {
  title: string;
  body: string;
  id: number;
};

const Post: React.FC<Props> = ({ title, body, id }) => {
  const dispatch = useDispatch<Dispatch<AllActions>>();

  return (
    <article className="post">
      <h2 className="post__header">{title}</h2>
      <p className="post__text">{body}</p>
      <button
        type="button"
        onClick={() => dispatch(deletePost(id))}
      >
        delete post
      </button>
    </article>
  );
};

export default Post;
