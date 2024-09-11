/* eslint-disable jsx-a11y/control-has-associated-label */

import classNames from 'classnames';
import React, { useEffect } from 'react';
import { Post } from '../types/Post';
import { useAppSelector } from '../app/hooks';
import { useDispatch } from 'react-redux';
import { setActivePost } from '../features/postsSlice';

type Props = {
  posts: Post[];
};

export const PostsList: React.FC<Props> = ({ posts }) => {
  const { activePost } = useAppSelector(state => state.posts);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(setActivePost(null));
  }, []);

  return (
    <div data-cy="PostsList">
      <p className="title">Posts:</p>

      <table className="table is-fullwidth is-striped is-hoverable is-narrow">
        <thead>
          <tr className="has-background-link-light">
            <th>#</th>
            <th>Title</th>
            <th></th>
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
                    'is-light': post.id !== activePost?.id,
                  })}
                  onClick={() =>
                    dispatch(
                      setActivePost(post.id === activePost?.id ? null : post),
                    )
                  }
                >
                  {post.id === activePost?.id ? 'Close' : 'Open'}
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};
