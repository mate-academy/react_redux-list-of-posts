/* eslint-disable jsx-a11y/control-has-associated-label */
/* eslint-disable no-param-reassign */
/* eslint-disable max-len */
import classNames from 'classnames';
import React from 'react';
import { useAppDispatch, useAppSelector } from '../app/hooks';
import * as selectPostActions from '../features/selectedPostSlice/selectedPostSlice';
import * as commentsActions from '../features/comments/commentsSlice';

export const PostsList: React.FC = () => {
  const posts = useAppSelector(state => state.posts.items);
  const selectedPostId = useAppSelector(state => state.selectedPost?.id);
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
            const isSelected = post.id === selectedPostId;

            return (
              <tr key={post.id} data-cy="Post">
                <td data-cy="PostId">{post.id}</td>
                <td data-cy="PostTitle">{post.title}</td>
                <td className="has-text-right is-vcentered">
                  <button
                    type="button"
                    data-cy="PostButton"
                    className={classNames('button', 'is-link', {
                      'is-light': post.id !== selectedPostId,
                    })}
                    onClick={() => {
                      if (isSelected) {
                        dispatch(selectPostActions.clearPost());
                        dispatch(commentsActions.clear());
                      } else {
                        dispatch(selectPostActions.setPost(post));
                      }
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
