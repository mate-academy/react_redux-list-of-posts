/* eslint-disable jsx-a11y/control-has-associated-label */

import classNames from 'classnames';
import React from 'react';
import { Post } from '../types/Post';
import {} from 'react-redux';
import { RootState } from '../app/store';
import { setSelectedPost } from '../features/selectedPost';
import { useAppDispatch, useAppSelector } from '../app/hooks';
type Props = {
  posts: Post[];
  selectedPostId?: number;
  onPostSelected: (post: Post | null) => void;
};

export const PostsList: React.FC<Props> = ({}) => {
  const dispatch = useAppDispatch();
  const posts = useAppSelector((state: RootState) => state.posts.items);

  const { post: selectedPost } = useAppSelector(state => state.selectedPost);

  const handlePostClick = (postId: number | null) => {
    if (postId === selectedPost?.id) {
      dispatch(setSelectedPost(null));
    } else {
      const selected = posts.find(post => post.id === postId);

      dispatch(setSelectedPost(selected || null));
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
                  onClick={() => {
                    handlePostClick(post.id);
                  }}
                >
                  {post.id === selectedPost.id ? 'Close' : 'Open'}
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};
