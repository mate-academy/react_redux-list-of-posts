import React, { memo } from 'react';
import cn from 'classnames';
import { useAppDispatch, useAppSelector } from '../app/hooks';
import { Post } from '../types/Post';
import * as postsActions from '../features/posts';
import * as commentsActions from '../features/comments';

export const PostsList: React.FC = memo(function PostsListComponent() {
  const dispatch = useAppDispatch();
  const { posts, selectedPost, visibleForm } = useAppSelector(state => ({
    ...state.posts,
    ...state.comments,
  }));

  const getSelectedPost = (post: Post) => {
    if (selectedPost?.id === post.id) {
      dispatch(postsActions.setSelectedPost(null));
    } else {
      dispatch(postsActions.setSelectedPost(post));
    }

    if (visibleForm) {
      dispatch(commentsActions.setVisibleForm(false));
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
          {posts.map(post => (
            <tr key={post.id} data-cy="Post">
              <td data-cy="PostId">{post.id}</td>
              <td data-cy="PostTitle">{post.title}</td>

              <td className="has-text-right is-vcentered">
                <button
                  type="button"
                  data-cy="PostButton"
                  className={cn('button', 'is-link', {
                    'is-light': post.id !== selectedPost?.id,
                  })}
                  onClick={() => getSelectedPost(post)}
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
});
