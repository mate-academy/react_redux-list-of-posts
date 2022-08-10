import classNames from 'classnames';
import React from 'react';
import { clientAPI } from '../store/clientApi';
import { useAppSelector, useAppDispatch } from '../store/hooks';
import { setSelectedPost } from '../store/Reducers/SelectedPostSlice';

export const PostsList: React.FC = () => {
  const { author } = useAppSelector(state => state.author);
  const { selectedPost } = useAppSelector(state => state.selectedPost);
  const { data: posts = [] } = clientAPI.useFetchAllPostsQuery(author?.id);
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
                    dispatch(setSelectedPost(post.id === selectedPost?.id
                      ? null
                      : post));
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
