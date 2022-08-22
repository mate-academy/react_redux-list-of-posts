import classNames from 'classnames';
import { FC } from 'react';
import { useAppDispatch, useAppSelector } from '../app/hooks';
import { clearSelectedPost, setSelectedPost }
  from '../features/userPosts/userPostsSlice';
import { Post } from '../types/Post';

export const PostsList: FC = () => {
  const dispatch = useAppDispatch();
  const { posts, selectedPost } = useAppSelector(state => state.userPosts);

  const handleSelectedPost = (post: Post) => {
    if (post.id === selectedPost?.id) {
      dispatch(clearSelectedPost());
    } else {
      dispatch(setSelectedPost(post));
    }
  };

  return (
    <div className="PostsList">
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
            <tr key={post.id}>
              <th>{post.id}</th>
              <td>{post.title}</td>
              <td className="has-text-right is-vcentered">
                <button
                  type="button"
                  className={classNames(
                    'button',
                    'is-link',
                    { 'is-light': post.id !== selectedPost?.id },
                  )}
                  onClick={() => handleSelectedPost(post)}
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
