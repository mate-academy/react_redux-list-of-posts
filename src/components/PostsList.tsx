/* eslint-disable jsx-a11y/control-has-associated-label */

import classNames from 'classnames';
import React from 'react';
import { Post } from '../types/Post';
import { useAppDispatch, useAppSelector } from '../app/hooks';
import * as postSelectedAction from '../features/postSelect';

type Props = {
  selectedPostId?: number;
};

export const PostsList: React.FC<Props> = ({}) => {
  const dispatch = useAppDispatch();
  const postSelect = useAppSelector(state => state.postSelect);
  const { posts } = useAppSelector(state => state.posts);

  function clickOpen(post: Post) {
    if (post.id === postSelect?.id) {
      dispatch(postSelectedAction.setPost({} as Post));
    } else {
      dispatch(postSelectedAction.setPost(post));
    }
  }

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
                    'is-light': post.id !== postSelect?.id,
                  })}
                  onClick={() => clickOpen(post)}
                >
                  {postSelect.id ? 'Close' : 'Open'}
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};
