import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { selectPostIdAction, State } from '../../store';
import './PostsList.scss';

export const PostsList: React.FC = () => {
  const dispatch = useDispatch();
  const posts = useSelector((state: State) => state.posts);
  const selectedPostId = useSelector((state: State) => state.selectedPostId);

  return (
    <div className="PostsList">
      <h2>Posts:</h2>

      <ul className="PostsList__list">
        {posts.map(post => (
          <li key={post.id} className="PostsList__item">
            <div>
              <b>{`User #${post.userId}:`}</b>
              {post.title}
            </div>
            {selectedPostId === post.id ? (
              <button
                onClick={() => dispatch(selectPostIdAction(0))}
                type="button"
                className="PostsList__button button"
              >
                Close
              </button>
            )
              : (
                <button
                  onClick={() => {
                    dispatch(selectPostIdAction(post.id));
                  }}
                  type="button"
                  className="PostsList__button button"
                >
                  Open
                </button>
              )}
          </li>
        ))}
      </ul>
    </div>
  );
};
