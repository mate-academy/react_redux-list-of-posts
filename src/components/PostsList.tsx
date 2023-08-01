import classNames from 'classnames';
import React from 'react';
import { Post } from '../types/Post';
import { useAppDispatch } from '../app/hooks';
import { actions as postsActions } from '../features/posts/postsSlice';

type Props = {
  posts: Post[],
  selectedPostId?: number,
};

export const PostsList: React.FC<Props> = ({
  posts,
  selectedPostId = 0,
}) => {
  const dispatch = useAppDispatch();

  const handleOnClick = (id: number, post: Post) => {
    const onPostSelected = id === selectedPostId
      ? null
      : post;

    dispatch(postsActions.setSelectedPost(onPostSelected));
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
          {posts.map(post => {
            const { id, title } = post;

            return (
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
                    onClick={() => handleOnClick(id, post)}
                  >
                    {id === selectedPostId ? 'Close' : 'Open'}
                  </button>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
};
