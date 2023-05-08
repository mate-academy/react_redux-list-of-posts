import classNames from 'classnames';
import React from 'react';
import { Post } from '../../types/Post';
import { useAppSelector, useAppDispatch } from '../../app/hooks';
import * as selectedPostActions from '../selectedPost/selectedPostSlice';

export const PostsList: React.FC = () => {
  const { items } = useAppSelector((state) => state.posts);
  const { selectedPost } = useAppSelector((state) => state.selectedPost);

  const dispatch = useAppDispatch();

  const selectPost = (post: Post) => {
    dispatch(selectedPostActions.selectPost(
      post.id === selectedPost?.id
        ? null
        : post,
    ));
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
          {items.map((item) => (
            <tr key={item.id} data-cy="Post">
              <td data-cy="PostId">{item.id}</td>
              <td data-cy="PostTitle">{item.title}</td>
              <td className="has-text-right is-vcentered">
                <button
                  type="button"
                  data-cy="PostButton"
                  className={classNames('button', 'is-link', {
                    'is-light': item.id !== selectedPost?.id,
                  })}
                  onClick={() => selectPost(item)}
                >
                  {item.id === selectedPost?.id ? 'Close' : 'Open'}
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};
