import React from 'react';
import { User } from './User';
import { CommentList } from './CommentList';
import { useDispatch } from 'react-redux';
import { removePost } from '../store/posts';

type PropsPost = {
  post: PreparedPost;
};

export const Post: React.FC<PropsPost> = ({ post }) => {
const dispatch = useDispatch();

  return (
    <>
      <li className="post__item">
        <button
          type="button"
          className="button"
          onClick={() => dispatch(removePost(post.id))}
        >Remove</button>
        <h2>{post.title}</h2>
        <p>{post.body}</p>
        <User user={post.user} />
        <CommentList comments={post.comments} />
      </li>
    </>
  );
};
