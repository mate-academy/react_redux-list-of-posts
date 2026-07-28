/* eslint-disable jsx-a11y/control-has-associated-label */

import classNames from 'classnames';
import { useAppDispatch, useAppSelector } from '../app/store';
import { fetchPosts, selectPostsState } from '../features/posts';
import { selectPost, selectSelectedPost } from '../features/selectedPost';
import { selectAuthor } from '../features/author';
import { useEffect } from 'react';
import { Loader } from './Loader';

export const PostsList = () => {
  const { posts, loaded, hasError } = useAppSelector(selectPostsState);
  const author = useAppSelector(selectAuthor);
  const selectedPost = useAppSelector(selectSelectedPost);
  const dispatch = useAppDispatch();

  useEffect(() => {
    if (author) {
      dispatch(fetchPosts(author.id));
    }
  }, [author, dispatch]);

  return (
    <>
      {!author && <p data-cy="NoSelectedUser">No user selected</p>}

      {author && !loaded && <Loader />}

      {author && loaded && hasError && (
        <div className="notification is-danger" data-cy="PostsLoadingError">
          Something went wrong!
        </div>
      )}

      {author && loaded && !hasError && posts.length === 0 && (
        <div className="notification is-warning" data-cy="NoPostsYet">
          No posts yet
        </div>
      )}

      {author && loaded && !hasError && posts.length > 0 && (
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
                        'is-light': post.id !== selectedPost?.id,
                      })}
                      onClick={() => {
                        dispatch(
                          selectPost(
                            post.id === selectedPost?.id ? null : post,
                          ),
                        );
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
      )}
    </>
  );
};
