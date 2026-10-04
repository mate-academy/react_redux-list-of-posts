import React from 'react';
import classNames from 'classnames';
import { useAppDispatch, useAppSelector } from '../app/hooks';
import { setSelectedPost } from '../features/selectedPost';
import { Loader } from './Loader';

export const PostsList: React.FC = () => {
  const dispatch = useAppDispatch();
  const { loaded, hasError, items: posts } = useAppSelector(
    state => state.posts,
  );
  const selectedPost = useAppSelector(state => state.selectedPost);

  if (!loaded) {
    return <Loader/>;
  }

  if (hasError) {
    return (
      <div className="notification is-danger" data-cy="PostsLoadingError">
        Something went wrong!
      </div>
    );
  }

  if (posts.length === 0) {
    return (
      <p data-cy="NoPostsYet">
        No posts yet
      </p>
    );
  }

  return (
    <div data-cy="PostsList">
      <h2 className="title is-4">Posts:</h2>
      <table className="table is-narrow is-fullwidth">
        <thead>
          <tr>
            <th>#</th>
            <th>Title</th>
            <th> </th>
          </tr>
        </thead>
        <tbody>
          {posts.map(post => {
            const isSelected = selectedPost?.id === post.id;

            return (
              <tr key={post.id} data-cy="Post">
                <td className="is-vcentered" data-cy="PostId">
                  {post.id}
                </td>
                <td className="is-vcentered">{post.title}</td>
                <td className="has-text-right is-vcentered">
                  <button
                    data-cy="PostButton"
                    type="button"
                    className={classNames('button is-link', {
                      'is-light': !isSelected,
                    })}
                    onClick={() => {
                      dispatch(
                        setSelectedPost(isSelected ? null : post),
                      );
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
