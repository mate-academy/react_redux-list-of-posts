import classNames from 'classnames';
import React from 'react';
import { useAppDispatch, useAppSelector } from '../app/hooks';
import * as postsActions from '../features/postsSlice';
import * as commentsActions from '../features/commentSlice';
import { Post } from '../types/Post';

export const PostsList: React.FC = () => {
  const dispatch = useAppDispatch();
  const { posts, post: selectedPost } = useAppSelector(state => state.posts);

  const selectPost = (value: Post) => {
    if (value.id === selectedPost?.id) {
      dispatch(postsActions.addPost(null));
      dispatch(commentsActions.removeComments());
      dispatch(commentsActions.changeVisible(false));
    } else {
      dispatch(postsActions.addPost(value));
      dispatch(commentsActions.initComments(value.id));
      dispatch(commentsActions.changeVisible(false));
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
          {posts.map((post) => (
            <tr key={post.id} data-cy="Post">
              <td data-cy="PostId">{post.id}</td>
              <td data-cy="PostTitle">{post.title}</td>
              <td className="has-text-right is-vcentered">
                <button
                  type="button"
                  data-cy="PostButton"
                  className={classNames('button', 'is-link', {
                    'is-light': post.id !== selectedPost?.id,
                  })}
                  onClick={() => {
                    selectPost(post);
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
