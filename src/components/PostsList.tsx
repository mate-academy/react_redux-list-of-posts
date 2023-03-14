import React from 'react';
import classNames from 'classnames';
import { useAppDispatch, useAppSelector } from '../app/hooks';
import { setSelectedPost } from '../features/selectedPostSlice';

export const PostsList: React.FC = () => {
  const dispatch = useAppDispatch();

  const posts = useAppSelector(state => state.posts.posts);
  const selectedPost = useAppSelector(state => state.selectedPost.selectedPost);

  const isSelected = (postId: number) => postId === selectedPost?.id;

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
                  className={classNames(
                    'button',
                    'is-link',
                    {
                      'is-light': !isSelected(post.id),
                    },
                  )}
                  onClick={() => {
                    dispatch(setSelectedPost(isSelected(post.id)
                      ? null
                      : post));
                  }}
                >
                  {isSelected(post.id) ? 'Close' : 'Open'}
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};
