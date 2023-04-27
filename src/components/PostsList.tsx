import classNames from 'classnames';
import React, { useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '../app/hooks';
import * as postsActions from '../features/posts/postsSlice';
import * as selectedPostActions from
  '../features/selectedPost/selectedPostSlice';
import { Loader } from './Loader';
import { User } from '../types/User';

type Props = {
  author: User
};

export const PostsList: React.FC<Props> = ({ author }) => {
  const dispatch = useAppDispatch();
  const { selectedPost } = useAppSelector(state => state.selectedPost);
  const { postsList, loading, hasError } = useAppSelector(state => state.posts);

  useEffect(() => {
    dispatch(postsActions.getPostsByUserId(author.id));
  }, [author]);

  if (loading) {
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

  if (author && !postsList.length) {
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
          {postsList.map(post => {
            const isSelected = post.id === selectedPost?.id;

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
                      dispatch(selectedPostActions.set(
                        isSelected ? null : post,
                      ));
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
