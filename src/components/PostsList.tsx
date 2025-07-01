/* eslint-disable jsx-a11y/control-has-associated-label */
import React from 'react';
import classNames from 'classnames';
import { useSelector, useDispatch } from 'react-redux';
import { RootState, AppDispatch } from '../app/store';
import { Post } from '../types/Post';
import { setSelectedPost } from '../features/posts/selectedPostSlice';
import { Loader } from './Loader';

export const PostsList: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();

  const {
    items: posts,
    loaded,
    hasError,
  } = useSelector((state: RootState) => state.posts);
  const selectedPost = useSelector(
    (state: RootState) => state.selectedPost.selectedPost,
  );

  const handlePostButtonClick = (post: Post) => {
    dispatch(setSelectedPost(post.id === selectedPost?.id ? null : post));
  };

  if (!loaded) {
    return <Loader />;
  }

  if (hasError) {
    return (
      <div className="notification is-danger" data-cy="PostsLoadingError">
        Something went wrong while loading posts!
      </div>
    );
  }

  if (posts.length === 0) {
    return (
      <div className="notification is-warning" data-cy="NoPostsYet">
        No posts yet for this user.
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
                  className={classNames('button', 'is-link', {
                    'is-light': post.id !== selectedPost?.id,
                  })}
                  onClick={() => handlePostButtonClick(post)}
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
