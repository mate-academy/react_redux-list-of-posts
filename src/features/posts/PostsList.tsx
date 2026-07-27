/* eslint-disable jsx-a11y/control-has-associated-label */

import classNames from 'classnames';
import React from 'react';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import * as selectedActions from '../selectedPost/selectedPostSlice';

type Props = {
  selectedPostId?: number;
};

export const PostsList: React.FC<Props> = ({ selectedPostId = 0 }) => {
  const { items } = useAppSelector(state => state.posts);
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
          {items.map(item => (
            <tr key={item.id} data-cy="Post">
              <td data-cy="PostId">{item.id}</td>
              <td data-cy="PostTitle">{item.title}</td>
              <td className="has-text-right is-vcentered">
                <button
                  type="button"
                  data-cy="PostButton"
                  className={classNames('button', 'is-link', {
                    'is-light': item.id !== selectedPostId,
                  })}
                  onClick={() => {
                    dispatch(
                      selectedActions.setPost(
                        item.id === selectedPostId ? null : item,
                      ),
                    );
                  }}
                >
                  {item.id === selectedPostId ? 'Close' : 'Open'}
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};
