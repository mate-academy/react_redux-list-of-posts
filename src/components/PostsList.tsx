import classNames from 'classnames';
import React from 'react';
import { useAppSelector } from '../app/hooks';
import { useDispatch } from 'react-redux';
import { Post } from '../types/Post';
import { postActions } from '../features/post';

export const PostsList: React.FC = () => {
  const posts = useAppSelector(state => state.posts);
  const selectedPost = useAppSelector(state => state.selectedPost);
  const dispatch = useDispatch();

  const handleSetSelectedPost = (post: Post | null) => {
    dispatch(postActions.setPost(post));
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
          {posts.value.map(post => (
            <tr key={post.id} data-cy="Post">
              <td data-cy="PostId">{post.id}</td>
              <td data-cy="PostTitle">{post.title}</td>
              <td className="has-text-right is-vcentered">
                <button
                  type="button"
                  data-cy="PostButton"
                  className={classNames('button', 'is-link', {
                    'is-light': post.id !== selectedPost.post?.id,
                  })}
                  onClick={() => {
                    handleSetSelectedPost(
                      post.id === selectedPost.post?.id ? null : post,
                    );
                  }}
                >
                  {post.id === selectedPost.post?.id ? 'Close' : 'Open'}
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};
