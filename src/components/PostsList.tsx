/* eslint-disable jsx-a11y/control-has-associated-label */
import classNames from 'classnames';
import React from 'react';
import { Post } from '../types/Post';
import { useAppDispatch, useAppSelector } from '../app/hooks';
import { setPost } from '../features/postsSlice';

export const PostsList: React.FC = () => {
  const dispatch = useAppDispatch();
  const posts = useAppSelector(state => state.posts.posts);
  const selectedPostId = useAppSelector(state => state.posts.post?.id);

  const onPostSelected = (post: Post) => {
    const newSelectedPostId = post?.id === selectedPostId ? null : post;

    dispatch(setPost(newSelectedPostId));
  };

  const handlePostClick = (postId: number) => {
    const selectedPost = posts.find(post => post.id === postId);

    if (selectedPost) {
      onPostSelected(selectedPost);
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
          {posts.map(({ id, title }) => (
            <tr key={id} data-cy="Post">
              <td data-cy="PostId">{id}</td>
              <td data-cy="PostTitle">{title}</td>
              <td className="has-text-right is-vcentered">
                <button
                  type="button"
                  data-cy="PostButton"
                  className={classNames(
                    'button',
                    'is-link',
                    {
                      'is-light': id !== selectedPostId,
                    },
                  )}
                  onClick={() => {
                    handlePostClick(id);
                  }}
                >
                  {id === selectedPostId ? 'Close' : 'Open'}
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};
