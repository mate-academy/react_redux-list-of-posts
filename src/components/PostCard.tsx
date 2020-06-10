import React from 'react';
import { useDispatch } from 'react-redux';
import { User } from './User';
import { Comment } from './Comment';
import { deletePost } from '../store';

type Props = {
  post: Post;
};

const PostCard: React.FC<Props> = ({ post }) => {
  const dispatch = useDispatch();
  const { title, body } = post;

  return (
    <>
      <h2 className="post__title">
        {title}
      </h2>
      <ul className="post__user">
        { post.user
        && (<User postUser={post.user} />)}
      </ul>
      <p className="post__text">
        {body}
      </p>
      <ul className="post__comments">
        {post.comments && post.comments.map(comment => (
          <li className="post__comment" key={comment.id}>
            <Comment comment={comment} />
          </li>
        ))}
      </ul>
      <button
        type="button"
        className="delete_button"
        onClick={() => dispatch(deletePost(title))}
      >
        Delete post
      </button>
    </>
  );
};

export default PostCard;
