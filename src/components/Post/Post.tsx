import React from 'react';
import { useDispatch } from 'react-redux';
import { User } from '../User/User';
import { CommentList } from '../CommentList/CommentList';
import './Post.css';
import { PostProps } from '../../helpers/types';
import { deletePost } from '../../store';

export const Post: React.FC<PostProps> = ({ post }) => {
  const title = post.title[0].toUpperCase() + post.title.substring(1);
  const dispatch = useDispatch();
  const deleteCurrentPost = (id: number) => (
    dispatch(deletePost(id))
  );

  return (
    <div className="test">
      <div className="posts__item">
        <button
          onClick={() => deleteCurrentPost(post.id)}
          type="button"
          className="close"
          aria-label="Close"
        >
          <span aria-hidden="true">&times;</span>
        </button>
        <h2>{title}</h2>
        <p className="posts__text">{post.body}</p>
        <User user={post.user} />
      </div>
      <div className="post__comments">
        <CommentList commentList={post.commentList} />
      </div>
    </div>
  );
};
