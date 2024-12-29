/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable jsx-a11y/control-has-associated-label */
import { useEffect } from 'react';
import classNames from 'classnames';

import { useAppDispatch, useAppSelector } from '../app/hooks';
import {
  actions as postsActions,
  loadUserPosts,
  actions as postActions,
} from '../features/posts';
import { Loader } from './Loader';

export const PostsList = () => {
  const dispatch = useAppDispatch();
  const { isLoading, hasError, selectedPost, posts } = useAppSelector(
    state => state.posts,
  );
  const { selectedUser } = useAppSelector(state => state.users);

  useEffect(() => {
    dispatch(postsActions.setSelectedPost(null));

    if (selectedUser) {
      dispatch(loadUserPosts(selectedUser.id));
    } else {
      dispatch(postsActions.clearUserPosts());
    }
  }, [selectedUser]);

  return (
    <>
      {!selectedUser && <p data-cy="NoSelectedUser">No user selected</p>}

      {selectedUser && isLoading && <Loader />}

      {selectedUser && !isLoading && hasError && (
        <div className="notification is-danger" data-cy="PostsLoadingError">
          Something went wrong!
        </div>
      )}

      {selectedUser && !isLoading && !hasError && !posts.length && (
        <div className="notification is-warning" data-cy="NoPostsYet">
          No posts yet
        </div>
      )}

      {selectedUser && !isLoading && !hasError && !!posts.length && (
        <div data-cy="PostsList">
          <p className="title">Posts:</p>

          {/* eslint-disable-next-line max-len */}
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
                const handleSelectedPostChange = () => {
                  dispatch(
                    postActions.setSelectedPost(
                      post.id === selectedPost?.id ? null : post,
                    ),
                  );
                };

                return (
                  <tr key={post.id} data-cy="Post">
                    <td data-cy="PostId">{post.id}</td>
                    <td data-cy="PostTitle">{post.title}</td>
                    <td className="has-text-right is-vcentered">
                      <button
                        type="button"
                        data-cy="PostButton"
                        className={classNames('button', 'is-link', {
                          'is-light': post.id !== selectedPost?.id,
                        })}
                        onClick={handleSelectedPostChange}
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
      )}
    </>
  );
};
