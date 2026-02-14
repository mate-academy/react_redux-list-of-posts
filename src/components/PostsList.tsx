/* eslint-disable jsx-a11y/control-has-associated-label */

import classNames from 'classnames';
import React from 'react';
import { useAppDispatch, useAppSelector } from '../app/hooks';
import { Post } from '../types/Post';
import * as selectedPostActions from '../features/selectedPost';
// import { Post } from '../types/Post';

// type Props = {
//   posts: Post[];
//   selectedPostId?: number;
//   onPostSelected: (post: Post | null) => void;
// };

export const PostsList: React.FC = () => {
  const dispatch = useAppDispatch();
  const { selectedPost } = useAppSelector(state => state.selectedPost);
  const { posts } = useAppSelector(state => state.posts);

  const handleselectedPost = (post: Post) => {
    if (post.id === selectedPost?.id) {
      dispatch(selectedPostActions.clearSelectedPost());
    } else {
      dispatch(selectedPostActions.setSelectedPost(post));
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
                    handleselectedPost(post);
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
