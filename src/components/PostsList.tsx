import classNames from 'classnames';
import { useEffect, useRef } from 'react';
import { useAppDispatch, useAppSelector } from '../app/hooks';
import { Post } from '../types/Post';
import * as postActions from '../features/postSlice';

type Props = {
  posts: Post[]
};

export const PostsList: React.FC<Props> = ({ posts }) => {
  const dispatch = useAppDispatch();
  const selectedPost = useAppSelector(state => state.post.post?.id);
  const selectedPostRef = useRef<number>(0);

  useEffect(() => {
    const Id = () => {
      if (selectedPostRef.current) {
        dispatch(postActions.init(selectedPostRef.current));
      }
    };

    window.addEventListener('online', Id);

    return () => window.removeEventListener('online', Id);
  }, []);

  const handleSelectPost = (post: Post) => {
    if (selectedPostRef.current === post.id) {
      dispatch(postActions.removePost());
      selectedPostRef.current = 0;

      return;
    }

    selectedPostRef.current = post.id;
    dispatch(postActions.addPost(post));
    dispatch(postActions.init(selectedPostRef.current));
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
                  className={classNames(
                    'button',
                    'is-link',
                    {
                      'is-light': selectedPost
                      && post.id !== selectedPost,
                    },
                  )}
                  onClick={() => handleSelectPost(post)}
                >
                  {selectedPost
                  && post.id === selectedPost ? 'Close' : 'Open'}
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};
