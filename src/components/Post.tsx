import React, { useCallback } from 'react';
import { deletePost } from '../redux/store/posts';
import { User } from './User';
import { CommentList } from './CommentList';
import { useDispatch } from 'react-redux';

export const Post = ({id, title, user, body, comments}: Post) => {
  const dispatch = useDispatch();
  const handleDeletePost = useCallback(() => dispatch(deletePost(id)), [dispatch])

  return (
    <section className="post">
      <h5 className="post__title">{title}</h5>
      <span className="post__delete"
            onClick={handleDeletePost}
      >
        Delete post
      </span>
      <p className="post__body">{body}</p>
      <User {...user} />
      <CommentList comments={comments} postId={id}/>
    </section>
  );
}
