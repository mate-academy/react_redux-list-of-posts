import classNames from 'classnames';
import React, { useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '../app/hooks';
import { Loader } from './Loader';
import { loadPosts } from '../features/posts/postsSlice';
import {
  setSelectedPost,
  selectSelectedPost,
} from '../features/selectedPost';
import { User } from '../types/User';

type Props = {
  author: User,
};

export const PostsList: React.FC<Props> = ({ author }) => {
  const {
    items: posts,
    loaded,
    hasError,
  } = useAppSelector(state => state.posts);
  const selectedPost = useAppSelector(selectSelectedPost);
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(loadPosts(author.id));
  }, [author]);

  if (!loaded) {
    return <Loader />;
  }

  if (hasError) {
    return (
      <div
        className="notification is-danger"
        data-cy="PostsLoadingError"
      >
        Something went wrong!
      </div>
    );
  }

  if (!posts.length) {
    return (
      <div className="notification is-warning" data-cy="NoPostsYet">
        No posts yet
      </div>
    );
  }

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
            const isSelected = selectedPost?.id === post.id;

            return (
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
                        'is-light': !isSelected,
                      },
                    )}
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
