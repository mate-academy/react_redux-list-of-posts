/* eslint-disable jsx-a11y/control-has-associated-label */

import classNames from 'classnames';
import React from 'react';
import { Post } from '../types/Post';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../app/store';
import { setClearSelected, setSelectedPost } from './slices/PostsSlice';

export const PostsList = () => {
  const postsUser = useSelector((state: RootState) => state.userPosts.posts);
  // eslint-disable-next-line
  const selectedPost = useSelector((state: RootState) => state.userPosts.selectedPost?.id);
  const dispatch = useDispatch();

  const handleSelect = (post: Post) => {
    if (selectedPost && selectedPost === post.id) {
      dispatch(setClearSelected());
    } else {
      dispatch(setSelectedPost(post));
    }
  };

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
          {postsUser.map(post => (
            <tr key={post.id} data-cy="Post">
              <td data-cy="PostId">{post.id}</td>
              <td data-cy="PostTitle">{post.title}</td>
              <td className="has-text-right is-vcentered">
                <button
                  type="button"
                  data-cy="PostButton"
                  className={classNames('button', 'is-link', {
                    'is-light': post.id !== selectedPost,
                  })}
                  onClick={() => handleSelect(post)}
                >
                  {post.id === selectedPost ? 'Close' : 'Open'}
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};
