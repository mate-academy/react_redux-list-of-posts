/* eslint-disable jsx-a11y/control-has-associated-label */

import classNames from 'classnames';
import React from 'react';
import { Post } from '../types/Post';
import { useAppDispatch, useAppSelector } from '../app/hooks';
import * as authorActions from '../features/slicers/getAuthor';
import * as commentsActions from '../features/slicers/getComments';

export const PostsList: React.FC = () => {
  const dispatch = useAppDispatch();
  const { posts, post } = useAppSelector(state => state.getAuthor);

  const handleClick = (p: Post) => {
    dispatch(commentsActions.clearVisible());
    if (p.id === post?.id) {
      return dispatch(authorActions.clearPost());
    }

    return dispatch(authorActions.setPost(p));
  };

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
          {posts.map(p => (
            <tr key={p.id} data-cy="Post">
              <td data-cy="PostId">{p.id}</td>
              <td data-cy="PostTitle">{p.title}</td>
              <td className="has-text-right is-vcentered">
                <button
                  type="button"
                  data-cy="PostButton"
                  className={classNames('button', 'is-link', {
                    'is-light': p.id !== post?.id,
                  })}
                  onClick={() => {
                    handleClick(p);
                  }}
                >
                  {p.id === post?.id ? 'Close' : 'Open'}
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};
