import { FC, memo, useCallback } from 'react';
import { useDispatch } from 'react-redux';
import classNames from 'classnames';
import { openPost, removePost } from '../../store/reducers/ActionCreators';
import { useAppSelector } from '../../store/hooks/redux';
import './PostsList.scss';
import { postsSlice } from '../../store/reducers/PostSlice';

export const PostList: FC = memo(() => {
  const { posts, currentPostId } = useAppSelector(state => state.postsReducer);
  const { closePost } = postsSlice.actions;

  const dispatch = useDispatch();

  const handleClick = useCallback((id: number) => {
    return currentPostId === id
      ? dispatch(closePost())
      : dispatch(openPost(id));
  }, [currentPostId]);

  const handleDelete = useCallback((id: number) => {
    const filteredPosts = posts.filter(post => post.id !== id);

    dispatch(removePost(id, filteredPosts));
  }, []);

  return (
    <div className="PostsList">
      <h2>Posts:</h2>

      <ul className="PostsList__list">
        {posts.map(post => (
          <li key={post.id} className="PostsList__item">
            <div className="PostsList__post">
              <div>
                <b>{`[User #${post.userId}] `}</b>
                {post.title}
              </div>
              <button
                type="button"
                className={classNames(
                  'PostsList__button button',
                  { 'button--active': currentPostId === post.id },
                )}
                onClick={() => handleClick(post.id)}
              >
                {currentPostId === post.id ? 'Close' : 'Open'}
              </button>
            </div>

            <button
              type="button"
              className="button button--delete"
              onClick={() => handleDelete(post.id)}
            >
              &times;
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
});
