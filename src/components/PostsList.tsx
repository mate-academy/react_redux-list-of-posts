/* eslint-disable jsx-a11y/control-has-associated-label */

import classNames from 'classnames';
import React, { useEffect } from 'react';
import { Post } from '../types/Post';
import { useSelector } from 'react-redux';
import { RootState } from '../app/store';
import { useAppDispatch } from '../app/hooks';
import { addPost } from '../features/SelectedPost/selectedPostSlice';

type Props = {
  posts: Post[];
};

export const PostsList: React.FC<Props> = ({ posts }) => {
  const selecetedPost = useSelector((state: RootState) => state.selecetedPost);
  const author = useSelector((state: RootState) => state.author);
  const dispatch = useAppDispatch();

  const handleSelect = (post: Post | null) => {
    if (post !== selecetedPost.value) {
      dispatch(addPost(post));
    }
  };

  useEffect(() => {
    handleSelect(null);
  },[author])

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
                    'is-light': post.id !== selecetedPost.value?.id,
                  })}
                  onClick={() =>
                    handleSelect(
                      post.id === selecetedPost.value?.id ? null : post,
                    )
                  }
                >
                  {post.id === selecetedPost.value?.id ? 'Close' : 'Open'}
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};
