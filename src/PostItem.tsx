import React from 'react';
import { useDispatch } from 'react-redux';
import User from './User';
import { deletePost } from './store/post';

type Props = {
  post: PostProps;
};

const PostItem: React.FC<Props> = ({ post }) => {
  const dispatch = useDispatch();

  return (
    <ul className="list">
      <li className="list__userInfo">
        <h3 className="title">{post.title}</h3>
        <p className="body">{post.body}</p>
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
