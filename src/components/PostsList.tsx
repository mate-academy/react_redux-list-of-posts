/* eslint-disable jsx-a11y/control-has-associated-label */
import { FC } from 'react';
import cn from 'classnames';

import { useAppDispatch, useAppSelector } from '../app/hooks';
import { setPost } from '../features/post/postSlice';
import { Post } from '../types/Post';

export const PostsList: FC = () => {
  const { posts, selectedPost } = useAppSelector(state => state.posts);

  const dispatch = useAppDispatch();

  const handleSelectPost = (post: Post) => {
    if (selectedPost?.id === post.id) {
      dispatch(setPost(null));
    } else {
      dispatch(setPost(post));
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
                  className={cn('button', 'is-link', {
                    'is-light': post.id !== selectedPost?.id,
                  })}
                  onClick={() => handleSelectPost(post)}
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
