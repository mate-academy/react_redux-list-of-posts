/* eslint-disable jsx-a11y/control-has-associated-label */
import classNames from 'classnames';
import React from 'react';
// 1. Імпортуємо хуки та екшени
import { useAppDispatch, useAppSelector } from '../app/hooks';
import {
  setSelectedPost,
  clearSelectedPost,
} from '../app/slices/selectedPostSlice';
import { Post } from '../types/Post';

// Ми можемо прибрати Props, якщо компонент повністю переходить на Redux,
// або залишити лише ті, що не стосуються стору.
export const PostsList: React.FC = () => {
  // 2. Отримуємо дані зі стору
  const posts = useAppSelector(state => state.posts.items);
  const selectedPostId = useAppSelector(state => state.selectedPost.id);
  const dispatch = useAppDispatch();

  // 3. Логіка обробки кліку
  const handleTogglePost = (post: Post) => {
    if (post.id === selectedPostId) {
      dispatch(clearSelectedPost());
    } else {
      dispatch(setSelectedPost(post.id));
    }
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
          {posts.map(post => (
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
                  onClick={() => handleTogglePost(post)}
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
