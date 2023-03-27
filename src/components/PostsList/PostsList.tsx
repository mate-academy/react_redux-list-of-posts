import classNames from 'classnames';
import React from 'react';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import { Post } from '../../types/Post';
import * as postsActions from '../../features/postsSlice';
import * as commentsActions from '../../features/commentsSlice';

export const PostsList: React.FC = () => {
  const { selectedPost, posts } = useAppSelector(state => state.posts);
  const dispatch = useAppDispatch();

  const handlePostSelect = (post: Post | null) => {
    dispatch(commentsActions.removeCommentsFromState());
    dispatch(postsActions.setPost(post));
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
                  className={classNames(
                    'button',
                    'is-link',
                    {
                      'is-light': post.id !== selectedPost?.id,
                    },
                  )}
                  onClick={() => {
                    handlePostSelect(
                      post.id === selectedPost?.id
                        ? null
                        : post,
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
