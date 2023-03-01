import classNames from 'classnames';
import React, { useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import {
  getPostsByAuthorId,
  selectPosts,
} from '../../features/posts/postsSlice';
import { setSelectedPost } from '../../features/selectedPost/selectedPostSlice';
import { User } from '../../types/User';
import { Loader } from '../Loader';

type Props = {
  selectedAuthor: User,
  selectedPostId?: number,
};

export const PostsList: React.FC<Props> = ({
  selectedAuthor,
  selectedPostId = 0,
}) => {
  const {
    items: posts,
    loaded,
    hasError,
  } = useAppSelector(selectPosts);
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(getPostsByAuthorId(selectedAuthor.id));
  }, [selectedAuthor]);

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
      <div
        className="notification is-warning"
        data-cy="NoPostsYet"
      >
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
                      'is-light': post.id !== selectedPostId,
                    },
                  )}
                  onClick={() => {
                    dispatch(setSelectedPost(
                      post.id === selectedPostId
                        ? null
                        : post,
                    ));
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
