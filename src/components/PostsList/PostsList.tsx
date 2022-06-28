import React, { useEffect } from 'react';
import './PostsList.scss';
import { useDispatch, useSelector } from 'react-redux';
import { getPosts } from '../../api/api';
import {
  getCurrentPostIdSelector,
  getPostsSelector,
} from '../../store/selectors';
import { setCurrentPostId, setPosts } from '../../store';

export const PostsList: React.FC = () => {
  const dispatch = useDispatch();

  const posts = useSelector(getPostsSelector);
  const currentPostId = useSelector(getCurrentPostIdSelector);

  useEffect(() => {
    const loadPostsFromServer = async () => {
      const postsFromServer = await getPosts();

      dispatch(setPosts(postsFromServer));
    };

    loadPostsFromServer();
  }, []);

  return (
    <div className="PostsList">
      <h2>Posts:</h2>

      <ul className="PostsList__list" data-cy="postDetails">
        {posts.map(post => (
          <li
            key={post.id}
            className="PostsList__item"
          >
            <div>
              <b>{`[User #${post.userId}]:`}</b>
              {post.body}
            </div>
            {post.id === +currentPostId
              ? (
                <button
                  type="button"
                  className="PostsList__button button"
                  onClick={() => {
                    dispatch(setCurrentPostId(''));
                  }}
                >
                  Close
                </button>
              )
              : (

                <button
                  type="button"
                  className="PostsList__button button"
                  onClick={() => {
                    dispatch(setCurrentPostId(String(post.id)));
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
