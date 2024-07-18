/* eslint-disable jsx-a11y/control-has-associated-label */

import classNames from 'classnames';
import React, { useCallback } from 'react';

import { Post } from '../types/Post';
import { useAppDispatch, useAppSelector } from '../app/hooks';
import { PostsState } from '../features/posts';
import {
  actions as selectedPostsActions,
  SelectedPostState,
} from '../features/selectedPost';

export const PostsList: React.FC = ({}) => {
  const dispatch = useAppDispatch();
  const postsState: PostsState = useAppSelector(state => state.posts);
  const { selectedPost }: SelectedPostState = useAppSelector(
    state => state.selectedPost,
  );

  const handleSetSelectedPost = useCallback(
    (currentPost: Post | null) =>
      dispatch(selectedPostsActions.set(currentPost)),
    [dispatch],
  );

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
          {postsState.posts.map(post => (
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
                    handleSetSelectedPost(
                      post.id === selectedPost?.id ? null : post,
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
