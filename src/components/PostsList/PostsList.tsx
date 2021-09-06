import React, { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';

import './PostsList.scss';

import {
  getPostsList,
  getSelectedPostId,
} from '../../store';
import { fetchPosts, setPostId } from '../../store/postsReducer';

import { Post } from '../../types';
import { setPostComments } from '../../store/commentsReducer';

export const PostsList: React.FC = () => {
  const posts: Post[] = useSelector(getPostsList);
  const postId = useSelector(getSelectedPostId);

  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const selectedUserId = Number(searchParams.get('userId')) || 0;
  const queryTitle = searchParams.get('query') || null;

  const dispatch = useDispatch();

  useEffect(() => {
    if (selectedUserId > 0) {
      console.log('userId and selectedUserId in useEffect 1', selectedUserId);
      dispatch(fetchPosts(selectedUserId));
    } else {
      console.log('userId and selectedUserId in useEffect 2', selectedUserId);
      dispatch(fetchPosts());
    }
  }, [selectedUserId, dispatch]);

  const filteredPosts = (queryTitle ? posts.filter(post => post.title.includes(queryTitle.toLowerCase())) : posts);
  const isPostListEmpty = posts ? (posts.length ? false : true) : true;

  return (
    <div className="PostsList">
      {isPostListEmpty ? (
        <p className="info">Posts list is empty.</p>
      ) : (
        <>
          <h2>Posts:</h2>
          <ul className="PostsList__list">
            {filteredPosts.map((post: any) => (
              <li className="PostsList__item" key={post.id}>
                <div className="PostsList__item-content">
                  <h3>{post.title}</h3>
                  <p>{post.body}</p>
                </div>
                {postId !== post.id ? (
                  <button
                    type="button"
                    className="PostsList__button button"
                    onClick={() => {
                      dispatch(setPostId(post.id))
                    }}
                  >
                    Open
                  </button>
                ) : (
                  <button
                    type="button"
                    className="PostsList__button button button--active"
                    onClick={() => {
                      dispatch(setPostId(0));
                      dispatch(setPostComments(null));
                    }}
                  >
                    Close
                  </button>
                )}
              </li>
            ))}
          </ul>
        </>
      )}
    </div>
  );
};
