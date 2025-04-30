/* eslint-disable jsx-a11y/control-has-associated-label */

import classNames from 'classnames';
import React from 'react';
// import { Post } from '../types/Post';
import { useAppDispatch, useAppSelector } from '../app/hooks';
import { setSelectedPost } from '../features/selectedPostSlice';
/*type Props = {
  posts: Post[];
  selectedPostId?: number;
  onPostSelected: (post: Post | null) => void;
};

export const PostsList: React.FC<Props> = ({
  posts,
  selectedPostId = 0,
  onPostSelected,
}) => (*/

export const PostsList: React.FC = () => {
  const dispatch = useAppDispatch();
  const { items: posts } = useAppSelector(state => state.posts);
  const selectedPostId = useAppSelector(
    state => state.selectedPost.selectedPost?.id,
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
          {posts.map(post => (
            <tr key={post.id} data-cy="Post">
              <td data-cy="PostId">{post.id}</td>
              <td data-cy="PostTitle">{post.title}</td>
              <td className="has-text-right is-vcentered">
                <button
                  type="button"
                  data-cy="PostButton"
                  className={classNames('button', 'is-link', {
                    'is-light': post.id !== selectedPostId,
                  })}
                  onClick={() => {
                    // onPostSelected(post.id === selectedPostId ? null : post);
                    dispatch(
                      setSelectedPost(post.id === selectedPostId ? null : post),
                    );
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
