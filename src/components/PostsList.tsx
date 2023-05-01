import classNames from 'classnames';
import React, { useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '../app/hooks';
import * as selectedPostActions from '../slices/selectedPost';
import { getPostsByUserId } from '../slices/posts';
import { User } from '../types/User';
import { Loader } from './Loader';

type Props = {
  author: User,
};

export const PostsList: React.FC<Props> = ({ author }) => {
  const { selectedPost } = useAppSelector(state => state.selectedPost);
  const { posts, loading, error } = useAppSelector(state => state.posts);
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(getPostsByUserId(author?.id || 0));
  }, [author]);

  if (loading) {
    return <Loader />;
  }

  if (error) {
    return (
      <div
        className="notification is-danger"
        data-cy="PostsLoadingError"
      >
        Something went wrong!
      </div>
    );
  }

  if (posts.length === 0) {
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
                      'is-light': post.id !== selectedPost?.id,
                    },
                  )}
                  onClick={() => {
                    dispatch(
                      selectedPostActions.setSelectedPost(
                        post.id === selectedPost?.id
                          ? null
                          : post,
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
  );
};
