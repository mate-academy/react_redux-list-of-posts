import React from 'react';
import { useAppDispatch, useAppSelector } from '../app/hooks';
import { setSelectedPost } from '../features/selectedPostSlice';

export const PostsList: React.FC = () => {
  const dispatch = useAppDispatch();

  // Дістаємо масив постів та поточний обраний пост зі Store
  const posts = useAppSelector(state => state.posts.items);
  const selectedPost = useAppSelector(state => state.selectedPost);

  return (
    <div data-cy="PostsList">
      <p className="title is-4">Posts:</p>
      <table className="table is-fullwidth is-striped is-hoverable is-narrow">
        <thead>
          <tr className="has-background-link-light">
            <th>#</th>
            <th>Title</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          {posts.map(post => {
            const isSelected = selectedPost?.id === post.id;

            return (
              <tr
                key={post.id}
                data-cy="Post"
                // Додаємо клас для підсвічування обраного рядка (якщо потрібно за стилями)
                className={isSelected ? 'has-background-link-light' : ''}
              >
                <td data-cy="PostId">{post.id}</td>
                <td data-cy="PostTitle">{post.title}</td>
                <td className="has-text-right is-vcentered">
                  <button
                    type="button"
                    data-cy="PostButton"
                    className={
                      isSelected ? 'button is-link' : 'button is-link is-light'
                    }
                    onClick={() => {
                      // Якщо клікаємо по вже відкритому посту — закриваємо його, інакше — відкриваємо
                      if (isSelected) {
                        dispatch(setSelectedPost(null));
                      } else {
                        dispatch(setSelectedPost(post));
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
