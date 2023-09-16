import classNames from 'classnames';
import React from 'react';
import { postsStates } from '../features/postsSlice';
import {
  selectedPostStates,
  actions,
} from '../features/selectedPostSlice';
import { useAppSelector, useAppDispatch } from '../app/hooks';
import { Post } from '../types/Post';

export const PostsList: React.FC = () => {
  const { items: posts } = useAppSelector(postsStates);
  const selectedPostId = useAppSelector(selectedPostStates)?.id;
  const dispatch = useAppDispatch();

  const onPostSelected = (post: Post) => {
    dispatch(actions.set(post.id === selectedPostId ? null : post));
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
          {posts.map((post: Post) => (
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
                      'is-light': post.id !== selectedPostId,
                    },
                  )}
                  onClick={() => onPostSelected(post)}
                >
                  {post.id === selectedPostId ? 'Close' : 'Open'}
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};
