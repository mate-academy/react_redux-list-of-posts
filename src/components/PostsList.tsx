import classNames from 'classnames';
import React from 'react';
import { useAppDispatch, useAppSelector } from '../app/hooks';
// eslint-disable-next-line @typescript-eslint/no-unused-vars, max-len
import * as selectedPostActions from '../features/selectedPost/selectedPostSlice';
import { postsSelector } from '../helpers/funcState';

type Props = {
  selectedPostId?: number,
};

export const PostsList: React.FC<Props> = ({
  selectedPostId = 0,
}) => {
  const dispatch = useAppDispatch();
  const { items } = useAppSelector(postsSelector);

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
          {items.map(post => {
            const isSelected = post.id === selectedPostId;

            const onAdd = () => {
              dispatch(selectedPostActions.add((isSelected ? null : post)));
            };

            return (
              <tr key={post.id} data-cy="Post">
                <td data-cy="PostId">{post.id}</td>
                <td data-cy="PostTitle">{post.title}</td>
                <td className="has-text-right is-vcentered">
                  <button
                    type="button"
                    data-cy="PostButton"
                    className={classNames(
                      'button',
                      'is-link',
                      {
                        'is-light': !isSelected,
                      },
                    )}
                    onClick={onAdd}
                  >
                    {isSelected ? 'Close' : 'Open'}
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
