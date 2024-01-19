import classNames from 'classnames';
import React from 'react';
import { useDispatch } from 'react-redux';
// import { Post } from '../types/Post';
import { set as selectPost } from '../features/selectedPost/selectedPost';
import { useAppSelector } from '../app/hooks';

/* type Props = {
  // posts: Post[],
  // selectedPostId?: number,
  // onPostSelected: (post: Post | null) => void,
}; */

export const PostsList: React.FC = (/* {
  // posts,
  // selectedPostId = 0,
  // onPostSelected,
} */) => {
  const dispatch = useDispatch();
  const selectedPostId = useAppSelector(state => state
    .selectedPost.post?.id) || 0;
  const posts = useAppSelector(state => state.posts.posts);

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
                  className={classNames(
                    'button',
                    'is-link',
                    {
                      'is-light': post.id !== selectedPostId,
                    },
                  )}
                  onClick={() => {
                    // onPostSelected(post.id === selectedPostId ? null : post);
                    if (post.id === selectedPostId) {
                      dispatch(selectPost(undefined));
                    } else {
                      dispatch(selectPost(post));
                    }
                  }}
                >
                  {post.id === selectedPostId ? 'Close' : 'Open'}
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};
