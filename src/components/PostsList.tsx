/* eslint-disable jsx-a11y/control-has-associated-label */

import classNames from 'classnames';
import React, { useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '../app/hooks';
import { fetchPosts, postsLists } from '../features/postList';
import { Post } from '../types/Post';
import { setCurrentPost } from '../features/currentPost';
import { selectedAuthor } from '../features/author';

export const PostsList: React.FC = ({}) => {
  const posts = useAppSelector(postsLists);
  const dispatch = useAppDispatch();
  const currentPost = useAppSelector(state => state.currentPost);
  const author = useAppSelector(selectedAuthor);

  useEffect(() => {
    if (author?.id) {
      dispatch(fetchPosts(author.id));
    }
  }, [dispatch, author]);
  console.log(posts);

  const handleCurrentPost = (post: Post | null) => {
    dispatch(setCurrentPost(post));
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
                  className={classNames('button', 'is-link', {
                    'is-light': post.id !== currentPost.currentPost?.id,
                  })}
                  onClick={() => {
                    handleCurrentPost(
                      post.id === currentPost.currentPost?.id ? null : post,
                    );
                  }}
                >
                  {post.id === currentPost.currentPost?.id ? 'Close' : 'Open'}
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};
