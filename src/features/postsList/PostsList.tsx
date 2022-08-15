/* eslint-disable jsx-a11y/control-has-associated-label */
import React from 'react';
import classNames from 'classnames';

import { useAppDispatch, useAppSelector } from '../../app/hooks';
import { postsList } from './postsListSlice';
import Status from '../../enums/Status';
import { Loader } from '../../common/Loader';
import { postDetails, selectPost } from '../postDetails/postDetailsSlice';

export const PostsList: React.FC = () => {
  const dispatch = useAppDispatch();
  const { posts, status } = useAppSelector(postsList);

  const selectedPostId = useAppSelector((state) => {
    const { selectedPost } = postDetails(state);

    return selectedPost ? selectedPost.id : 0;
  });

  if (status === Status.Loading) {
    return <Loader />;
  }

  if (status === Status.Failed) {
    return (
      <div className="notification is-danger">
        Something went wrong!
      </div>
    );
  }

  if (posts.length === 0) {
    return (
      <div className="notification is-warning">
        No posts yet
      </div>
    );
  }

  return (
    <div className="PostsList">
      <p className="title">Posts:</p>

      <table className="table is-fullwidth is-striped is-hoverable is-narrow">
        <thead>
          <tr className="has-background-link-light">
            <th>#</th>
            <th>Title</th>
            <th />
          </tr>
        </thead>

        <tbody>
          {posts.map(post => (
            <tr key={post.id}>
              <th>{post.id}</th>
              <td>{post.title}</td>
              <td className="has-text-right is-vcentered">
                <button
                  type="button"
                  className={classNames({
                    button: true,
                    'is-link': true,
                    'is-light': post.id !== selectedPostId,
                  })}
                  onClick={() => {
                    dispatch(selectPost(post.id === selectedPostId
                      ? null
                      : post));
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
