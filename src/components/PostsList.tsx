/* eslint-disable jsx-a11y/control-has-associated-label */

import classNames from 'classnames';
import React, { useEffect } from 'react';
import { Post } from '../types/Post';
import { Loader } from './Loader';

import { useAppDispatch, useAppSelector } from '../app/hooks';
import { fetchPosts } from '../features/posts';
import { saveSelectedPost } from '../features/selectedPost';

export const PostsList: React.FC = () => {
  const dispatch = useAppDispatch();
  const selectedPost = useAppSelector(state => state.selectedPost);
  const author = useAppSelector(state => state.author);
  const {
    items: posts,
    loaded,
    hasError,
  } = useAppSelector(state => state.posts);

  useEffect(() => {
    if (author) {
      dispatch(fetchPosts(author.id));
    }
  }, [dispatch, author]);

  const handleSelectPost = (post: Post) => {
    if (selectedPost?.id === post.id) {
      dispatch(saveSelectedPost(null));
    } else {
      dispatch(saveSelectedPost(post));
    }
  };

  if (!author) {
    return null;
  }

  if (!loaded && !hasError) {
    return <Loader />;
  }

  if (loaded && hasError) {
    return (
      <div className="notification is-danger" data-cy="PostsLoadingError">
        Something went wrong!
      </div>
    );
  }

  if (loaded && !hasError && posts.length === 0) {
    return (
      <div className="notification is-warning" data-cy="NoPostsYet">
        No posts yet
      </div>
    );
  }

  return (
    <div data-cy="PostsList">
      <p className="title">Posts:</p>

      {loaded && !hasError && posts.length > 0 && (
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
                    onClick={() => handleSelectPost(post)}
                  >
                    {post.id === selectedPost?.id ? 'Close' : 'Open'}
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};
