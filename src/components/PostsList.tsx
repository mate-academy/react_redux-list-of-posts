/* eslint-disable jsx-a11y/control-has-associated-label */

import classNames from 'classnames';
import React from 'react';
import { Post } from '../types/Post';
import { useAppDispatch, useAppSelector } from '../app/hooks';
import { actions, selectedPostSelector } from '../features/selectedPostSlice';

type Props = {
  posts: Post[];
};

export const PostsList: React.FC<Props> = ({ posts }) => {
  const selectedPost = useAppSelector(selectedPostSelector);
  const dispatch = useAppDispatch();

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
          {posts.map(post => {
            const isPostSelected = post.id === selectedPost?.id;

            return (
              <tr key={post.id} data-cy="Post">
                <td data-cy="PostId">{post.id}</td>

                <td data-cy="PostTitle">{post.title}</td>

                <td className="has-text-right is-vcentered">
                  <button
                    type="button"
                    data-cy="PostButton"
                    className={classNames('button', 'is-link', {
                      'is-light': !isPostSelected,
                    })}
                    onClick={() => {
                      dispatch(
                        actions.setSelectedPost(isPostSelected ? null : post),
                      );
                    }}
                  >
                    {isPostSelected ? 'Close' : 'Open'}
                  </button>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
};
