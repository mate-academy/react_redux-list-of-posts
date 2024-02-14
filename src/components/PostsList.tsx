import classNames from 'classnames';
import React from 'react';
import { useAppDispatch, useAppSelector } from '../app/hooks';
import { actions as selectedPostActions } from '../features/selectedPostSlice';

export const PostsList: React.FC = () => {
  const { items: posts } = useAppSelector(state => state.posts);
  const { selectedPost } = useAppSelector(state => state.selectedPost);

  const dispatch = useAppDispatch();

  return (
    <div data-cy="PostsList">
      <p className="title">Posts:</p>

      <table className="table is-fullwidth is-striped is-hoverable is-narrow">
        <thead>
          <tr className="has-background-link-light">
            <th>#</th>
            <th>Title</th>
            {/* eslint-disable-next-line jsx-a11y/control-has-associated-label */}
            <th> </th>
          </tr>
        </thead>

        <tbody>
          {posts.map(({ id, title }) => (
            <tr key={id} data-cy="Post">
              <td data-cy="PostId">{id}</td>
              <td data-cy="PostTitle">{title}</td>
              <td className="has-text-right is-vcentered">
                <button
                  type="button"
                  data-cy="PostButton"
                  className={classNames(
                    'button',
                    'is-link',
                    {
                      'is-light': id !== selectedPost?.id,
                    },
                  )}
                  onClick={() => {
                    dispatch(selectedPostActions.set(
                      id === selectedPost?.id
                        ? null
                        : {
                          id, title, userId: 0, body: '',
                        },
                    ));
                  }}
                >
                  {id === selectedPost?.id ? 'Close' : 'Open'}
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};
