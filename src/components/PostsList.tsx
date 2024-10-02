/* eslint-disable jsx-a11y/control-has-associated-label */

import classNames from 'classnames';
import { Post } from '../types/Post';
import {useAppDispatch, useAppSelector} from '../app/hooks';
import { actions as currentPostActions } from '../features/currentPost';

export const PostsList = () => {
  const dispatch = useAppDispatch();
  const { currentUserPosts } = useAppSelector(store => store.currentUser);
  const { currentPost } = useAppSelector(store => store.currentPost);

  const setCurrentPost = (post: Post | null) => dispatch(currentPostActions.setCurrentPost(post));

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
        {currentUserPosts.map(post => (
          <tr key={post.id} data-cy="Post">
            <td data-cy="PostId">{post.id}</td>
            <td data-cy="PostTitle">{post.title}</td>
            <td className="has-text-right is-vcentered">
              <button
                type="button"
                data-cy="PostButton"
                className={classNames('button', 'is-link', {
                  'is-light': post.id !== currentPost?.id,
                })}
                onClick={() => {
                  setCurrentPost(post.id === currentPost?.id ? null : post);
                }}
              >
                {post.id === currentPost?.id ? 'Close' : 'Open'}
              </button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  </div>
)};
