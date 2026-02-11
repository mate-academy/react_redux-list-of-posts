/* eslint-disable jsx-a11y/control-has-associated-label */

import classNames from 'classnames';
import React, { useEffect } from 'react';
import { Post } from '../types/Post';
import { useAppDispatch, useAppSelector } from '../app/hooks';
import { selectPost } from '../features/CurrentPostAPI/CurrentPostAPI';

export const PostsList: React.FC = () => {
  const { posts } = useAppSelector(state => state.posts);
  const selectedPost = useAppSelector(state => state.currentPost.post);
  const dispatch = useAppDispatch();
  const selectedUser = useAppSelector(state => state.author.user);

  const handleSelectedPost = (post: Post) => {
    dispatch(selectPost({ post }));
  };

  useEffect(() => {
    dispatch(selectPost({ post: null }));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedUser]);

  return (
    <div data-cy="PostsList">
      <p className="title">Posts:</p>

      <table className="table is-fullwidth is-striped is-hoverable is-narrow">
        <thead>
          <tr className="has-background-link-light">
            <th>#</th>
            <th>Title</th>
            <th> </th>
          </tr>
        </thead>

        <tbody>
          {posts.map(post => (
            <tr key={post.id} data-cy="Post">
              <td data-cy="PostId">{post.id}</td>
              <td data-cy="PostTitle">{post.title}</td>
              <td className="has-text-right is-vcentered">
                <button
                  type="button"
                  data-cy="PostButton"
                  className={classNames('button', 'is-link', {
                    'is-light': post.id !== selectedPost?.id,
                  })}
                  onClick={() => {
                    handleSelectedPost(post);
                  }}
                >
                  {post.id === selectedPost?.id ? 'Close' : 'Open'}
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};
