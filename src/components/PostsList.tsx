import classNames from 'classnames';
import React from 'react';
import { Post } from '../types/Post';
import { useAppDispatch, useAppSelector } from '../app/hooks';
import { setPost } from '../features/selectedPost';
import { remove } from '../features/comments';

export const PostsList: React.FC = () => {
  const { posts } = useAppSelector(state => state.posts);
  const dispatch = useAppDispatch();
  const { selectedPost } = useAppSelector(state => state.selectedPost);

  const handleTogglePost = (post: Post) => {
    dispatch(setPost(
      post.id === selectedPost?.id ? null : post,
    ));
    dispatch(remove);
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
                      'is-light': id !== selectedPost?.id,
                    },
                  )}
                  onClick={() => handleTogglePost({
                    id,
                    title,
                    userId: 0,
                    body: '',
                  })}
                >
                  {id === selectedPost?.id ? 'Close' : 'Open'}
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};
