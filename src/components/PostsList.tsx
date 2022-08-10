import classNames from 'classnames';
import React from 'react';
import { useAppDispatch, useAppSelector } from '../store/hooks';
import { setSelectedPost } from '../store/reducers/postSlice';

export const PostsList: React.FC = () => {
  const { posts, selectedPost } = useAppSelector(state => state.posts);
  const dispatch = useAppDispatch();
  const selectedPostId = selectedPost?.id;

  return (
    <div className="PostsList">
      <p className="title">Posts:</p>

      <table className="table is-fullwidth is-striped is-hoverable is-narrow">
        <thead>
          <tr className="has-background-link-light">
            <th>#</th>
            <th>Title</th>
            <th>_</th>
          </tr>
        </thead>

        <tbody>
          {posts.map(post => (
            <tr key={post.id}>
              <th>{post.id}</th>
              <td>{post.title}</td>
              <td className="has-text-right is-vcentered">
                <button
                  type="button"
                  className={classNames(
                    'button',
                    'is-link',
                    {
                      'is-light': post.id !== selectedPostId,
                    },
                  )}
                  onClick={() => {
                    dispatch(setSelectedPost(post.id === selectedPostId
                      ? null
                      : post));
                  }}
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
