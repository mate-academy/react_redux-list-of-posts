import classNames from 'classnames';
import React from 'react';
import { useAppDispatch, useAppSelector } from '../app/hooks';
import { commentsSlice } from '../features/slices/commentsSlice';
import { selectedPostSlice } from '../features/slices/selectedPostSlice';
import { Post } from '../types/Post';

export const PostsList: React.FC = () => {
  const posts = useAppSelector(state => state.posts.items);
  const { selectedPost } = useAppSelector(state => state.selectedPost);
  const dispatch = useAppDispatch();

  const handleTogglePost = (post: Post) => {
    dispatch(selectedPostSlice
      .actions.setSelectedPost(post.id === selectedPost?.id
        ? null : post));
    dispatch(commentsSlice.actions.clearComments());
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
                        'is-light': id !== selectedPost?.id,
                      },
                    )}
                    onClick={() => handleTogglePost(post)}
                  >
                    {post.id === selectedPost?.id ? 'Close' : 'Open'}
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
