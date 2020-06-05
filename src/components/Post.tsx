import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { deletePost } from '../store/posts';
import { User } from './User';
import { CommentList } from './CommentList';

type PostProps = {
  post: DataPost;
};

export const Post: React.FC<PostProps> = ({ post }) => {
  const [isChecked, toggleChecked] = useState<boolean>(false);
  const dispatch = useDispatch();

  return (
    <li className="post">
      <div className="post_body">
        <button
          className="post_delete-btn"
          type="button"
          onClick={() => dispatch(deletePost(post.id))}
        />
        <div>
          <div className="avatar" />
          <h3 className="post_title">{post.title}</h3>
          <p className="post_text">{post.body}</p>
        </div>
        <User {...post.user} />
      </div>
      <div className="toggle-comments">
        <label htmlFor="checkbox">
          <i className="toggle-checkbox material-icons">arrow_drop_down</i>
          <input id="checkbox" className="checkbox" type="checkbox" checked={isChecked} onChange={() => toggleChecked(!isChecked)} />
        </label>
      </div>
      {isChecked
        && (<CommentList comments={post.comments} />)}
    </li>
  );
};
