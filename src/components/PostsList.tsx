import classNames from 'classnames';
import React from 'react';
import { useAppDispatch, useAppSelector } from '../app/hooks';
import { setSelectPost } from '../features/postsSlice/postsSlice';

export const PostsList: React.FC = () => {
  // const {author: selectedUser} = useAppSelector(state => state.users);
  const { posts, selectedPost } = useAppSelector(state => state.posts);

  const dispatch = useAppDispatch();

  return (
    <div className="PostsList">
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
                      'is-light': post.id !== selectedPost?.id,
                    },
                  )}
                  onClick={() => {
                    if (selectedPost?.id === post.id) {
                      dispatch(setSelectPost(null));
                    } else {
                      dispatch(setSelectPost(post));
                    }
                  }}
                >
                  {post.id === selectedPost?.id ? 'Close' : 'Open'}
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};
