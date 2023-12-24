/* eslint-disable jsx-a11y/control-has-associated-label */
import classNames from 'classnames';
import React, { useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '../app/hooks';
import { Loader } from './Loader';
import { initPosts } from '../features/postsSlice';
import { removePost, setPost } from '../features/selectedPostSlice';
import { Post } from '../types/Post';
import { User } from '../types/User';
import { removeComments } from '../features/commentsSlice';

type Props = {
  user: User,
};

export const PostsList: React.FC<Props> = ({ user }) => {
  const dispatch = useAppDispatch();

  const {
    posts,
    loading: postsLoading,
    error: postsError,
  } = useAppSelector(state => state.posts);

  const { selectedPost } = useAppSelector(state => state.selectedPost);

  useEffect(() => {
    dispatch(initPosts(user.id));
  }, [user.id]);

  const handleClickPost = (postId: number, post: Post) => {
    if (postId === selectedPost?.id) {
      dispatch(removePost());
      // eslint-disable-next-line no-console
      console.log(postId === selectedPost?.id);
      dispatch(removeComments());
    } else {
      dispatch(setPost(post));
    }
  };

  if (postsLoading) {
    return (
      <Loader />
    );
  }

  if (postsError) {
    return (
      <div
        className="notification is-danger"
        data-cy="PostsLoadingError"
      >
        {postsError}
      </div>
    );
  }

  if (posts?.length === 0) {
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
          {posts?.map(post => (
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
                  onClick={() => handleClickPost(post.id, post)}
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
