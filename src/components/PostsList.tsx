import classNames from 'classnames';
import React from 'react';
import { Post } from '../types/Post';
import { useAppDispatch } from '../app/hooks';
import {
  actions as selectedPostActions,
} from '../features/selectedPost/selectedPostSlice';

type Props = {
  posts: Post[],
  selectedPostId?: number,
};

export const PostsList: React.FC<Props> = ({
  posts,
  selectedPostId = 0,
}) => {
  const dispatch = useAppDispatch();

  const equalityId = (postId: number, pressedPostId: number) => {
    return postId === pressedPostId;
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
          {posts.map(({
            id, title, userId, body,
          }) => (
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
                    dispatch(selectedPostActions
                      .setPost(equalityId(id, selectedPostId) ? (
                        null
                      ) : (
                        {
                          id, title, userId, body,
                        }
                      )));
                  }}
                >
                  {equalityId(id, selectedPostId) ? 'Close' : 'Open'}
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};
