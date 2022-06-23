import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { PostsActionCreators }
  from '../../redux/reducers/posts/action-creators';
import { Posts, SelectedPost } from '../../redux/reducers/posts/selectors';
import './PostsList.scss';

export const PostsList: React.FC = () => {
  const dispatch = useDispatch();
  const posts = useSelector(Posts);
  const activePostId = useSelector(SelectedPost);

  const openPost = (postId: number | null) => {
    dispatch(PostsActionCreators.setActivePost(postId));
  };

  return (
    <div className="PostsList">
      <h2>Posts:</h2>

      <ul className="PostsList__list" data-cy="postDetails">
        {posts.length > 0 && posts.map((post) => (
          <li
            key={post.id}
            className="PostsList__item"
          >
            <div>
              <b>{`[User #${post.id}]: `}</b>
              {post.title}
            </div>
            {post.id === activePostId ? (
              <button
                type="button"
                className="PostsList__button button"
                onClick={() => {
                  openPost(null);
                }}
              >
                Close
              </button>
            ) : (
              <button
                type="button"
                className="PostsList__button button"
                onClick={() => {
                  openPost(post.id);
                }}
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
