import React, { useEffect, useState } from 'react';
import './Posts.scss';
import { useDispatch, useSelector } from 'react-redux';
import { getPosts } from '../../posts';
import {
  loadPostsAction,
  setPostIdAction,
  setSelectedPostAction,
} from '../../store/actions';
import { getPostsSelector } from '../../store/selectors';

export const Posts: React.FC = () => {
  const [activePost, setActivePost] = useState(0);
  const dispatch = useDispatch();

  const posts = useSelector(getPostsSelector);

  useEffect(() => {
    const loadPostsFromServer = async () => {
      const postsFromServer = await getPosts();

      dispatch(loadPostsAction(postsFromServer));
    };

    loadPostsFromServer();
  }, []);

  const clickHandlerOpen = (postId: number) => {
    setActivePost(postId);
    dispatch(setPostIdAction(postId));
    dispatch(setSelectedPostAction(postId));
  };

  const clickHandlerClose = () => {
    setActivePost(0);
    // dispatch(setPostIdAction(0));
    dispatch(setSelectedPostAction(null));
  };

  return (
    <div className="posts">
      <ul className="posts__list">
        {posts.map((post) => (
          <li className="posts__item" key={post.id}>
            <p className="posts__title">{post.title}</p>
            <p className="posts__body">{post.body}</p>
            {
              (post.id === activePost)
                ? (
                  <button
                    className="posts__button button small is-info"
                    type="button"
                    onClick={() => clickHandlerClose()}
                  >
                    Close
                  </button>
                )
                : (
                  <button
                    className="posts__button button small is-dark"
                    type="button"
                    onClick={() => clickHandlerOpen(post.id)}
                  >
                    Open
                  </button>
                )
            }
          </li>
        ))}
      </ul>
    </div>
  );
};
