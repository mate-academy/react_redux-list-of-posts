import React from 'react';
import classNames from 'classnames';
import { useAppDispatch, useAppSelector } from '../app/hooks';
import { setSelectedPost } from '../features/postsSlice';

// Прибираємо Props, оскільки тепер дані приходять із Redux
export const PostsList: React.FC = () => {
  const dispatch = useAppDispatch();

  // Отримуємо список постів та поточний обраний пост зі стору
  const { items: posts, selectedPost } = useAppSelector(state => state.posts);

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
          {posts.map(post => (
            <tr key={post.id} data-cy="Post">
              <td data-cy="PostId">{post.id}</td>

              <td data-cy="PostTitle">{post.title}</td>

              <td className="has-text-right is-vcentered">
                <button
                  type="button"
                  data-cy="PostButton"
                  className={classNames('button is-link', {
                    'is-light': selectedPost?.id !== post.id,
                  })}
                  onClick={() => {
                    const nextPost = selectedPost?.id !== post.id ? post : null;

                    dispatch(setSelectedPost(nextPost));
                  }}
                >
                  {selectedPost?.id !== post.id ? 'Open' : 'Close'}
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};
