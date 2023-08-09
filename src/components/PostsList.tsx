import classNames from 'classnames';
import React from 'react';
import { useAppDispatch, useAppSelector } from '../app/hooks';
import { setSelection } from '../slices/selectedPost';
import { Post } from '../types/Post';

export const PostsList: React.FC = () => {
  const dispatch = useAppDispatch();
  const posts = useAppSelector(state => state.posts.items);
  const { selectedPost } = useAppSelector(state => state.selectedPost);

  const handleTogglePost = (post: Post, isSelected: boolean) => {
    dispatch(setSelection(isSelected
      ? null : post));
    // dispatch(commentsSlice.actions.clearComments());
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
          {posts.map(post => {
            const { id, title } = post;
            const isSelected = id === selectedPost?.id;

            return (
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
                        'is-light': !isSelected,
                      },
                    )}
                    onClick={() => {
                      handleTogglePost(post, isSelected);
                    }}
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
