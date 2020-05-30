import React, { useMemo } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { getPosts, queryValue } from '../store';
import { deleteComm, deletePost } from '../store/posts';
import { filterPosts } from '../helpers/filterPosts';

export const PostsList: React.FC = () => {
  const posts: Post[] = useSelector(getPosts);
  const dispatch = useDispatch();
  const query = useSelector(queryValue);

  const visiblePosts: Post[] = useMemo(
    () => filterPosts(posts, query),
    [posts, query],
  );

  return (
    <>
      {visiblePosts.map(post => (
        <div className="post" key={post.id}>
          <button
            type="button"
            className="delete__post"
            onClick={() => dispatch(deletePost(post.id))}
          >
            delete post
          </button>
          <p className="post__title">
            <span className="post__id">
              {post.id}
              .
            </span>
            {post.title}
          </p>
          <p className="post__body">
            {post.body}
          </p>
          {post.comments.map(comment => (
            <div className="post__comm" key={comment.id}>
              <div className="comm">
                <p className="comm__name">
                  {comment.name}
                </p>
                <p className="comm__email">
                  {comment.email}
                </p>
                <p className="comm__body">
                  {comment.body}
                </p>
                <button
                  className="delete__comm"
                  type="button"
                  onClick={() => dispatch(deleteComm(comment.id))}
                >
                  delete
                </button>
              </div>
            </div>
          ))}
        </div>
      ))}
    </>
  );
};
