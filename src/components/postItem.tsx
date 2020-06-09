import React from 'react';
import { useDispatch } from 'react-redux';
import User from './user';
import { deletePost } from './post';

type Props = {
  post: PostProps;
};

const PostItem: React.FC<Props> = ({ post }) => {
  const dispatch = useDispatch();

  return (
    <ul className="post__list">
      <li className="post__item">
        <h3 className="post__title">{post.title}</h3>
        <p className="post__body">{post.body}</p>
        <button
          className="delete-button"
          type="button"
          onClick={() => dispatch(deletePost(post.id))}
        >
          x
        </button>
        <User author={post.author} comments={post.comments} postId={post.id} />
      </li>
    </ul>
  );
};

export default PostItem;
