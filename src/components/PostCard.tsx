import React from 'react';
import { User } from './User';
import { Comment } from './Comment';
import './PostCard.scss';

import { useDispatch } from 'react-redux';
import {
  deletePost
} from '../store';

type Props = {
  post: Post;
};

const PostCard: React.FC<Props> = ({ post }) => {
  const dispatch = useDispatch();
  const {
    title, body, postUser, postComment,
  } = post;

  return (
    <>
      <h2 className="post__title">
        {title}
      </h2>
      <ul className="post__user user">
        <User postUser={postUser} />
      </ul>
      <p className="post__text">
        {body}
      </p>
      <ul className="post__comment comment__list">
        {postComment.map(comment => (
          <li className="comment__item" key={comment.id}>
            <Comment comment={comment} />
          </li>
        ))}
      </ul>
      <button
        type="button"
        className="post__button post__button--delete"
        onClick={() => dispatch(deletePost(title))}
      >
        Delete post
      </button>
    </>
  );
}

export default PostCard;


