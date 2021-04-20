import React, { useMemo, useCallback, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useLocation } from 'react-router-dom';

import './PostList.scss';

import { getServerPosts, getPostId, loadPostsbyUser, loadPosts, loadPostDetails } from '../../store';
import { setPostID, setPosts } from '../../store/postReducer';

import { deletePost } from '../../helpers/api';
import { POST } from '../../type';

export const PostsList = () => {
  const dispatch = useDispatch();
  const posts: POST[] = useSelector(getServerPosts);
  const postId = useSelector(getPostId);
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const appliedQuery = searchParams.get('query') || '';
  const selectedUserId = searchParams.get('selectedId') || '';


  const fetchPostsbyUser = (userId: number) => {
    return dispatch(loadPostsbyUser(userId));
  };

  const fetchPostDetails = (id: number) => {
    return dispatch(loadPostDetails(id));
  }

  useEffect(() => {
    const userId = Number(selectedUserId);
    if (userId !== 0){
      fetchPostsbyUser(userId);
    } else {
      dispatch(loadPosts())
    }
  }, [selectedUserId]);

  useEffect(() => {
    if (postId !== 0) {
        fetchPostDetails(postId);
    }
  }, [postId]);


  const visiblePosts = useMemo(() => {
    if (!appliedQuery) {
      return posts;
    }

    const titleFromQuery = appliedQuery.toLowerCase();

    return posts.filter(({ title }) => ` ${title || ''}`.toLowerCase().includes(titleFromQuery));
  }, [posts, appliedQuery]);

  const removePost = useCallback((id: number) => {
    const filteredPosts = visiblePosts.filter(post => post.id !== id);
    dispatch(setPosts(filteredPosts));
    deletePost(id);
  },[posts]);


  return(
   <div className="PostsList">
     <ul className="PostsList__list">
      {visiblePosts.length !== 0
        ? visiblePosts.map(post => (
          <li
            key={post.id}
            className="PostsList__item"
          >
            <div>
              <b>`[User # {post.userId}]: `</b>{post.title}
            </div>

            <div className="PostsList__container">
              {postId === post.id 
                ? (
                  <button
                    type="button"
                    className="PostsList__button button"
                    onClick={() => dispatch(setPostID(0))}
                  >
                    Close
                  </button>
              ) : (
                  <button
                    type="button"
                    className="PostsList__button button"
                    onClick={() => dispatch(setPostID(post.id ))}
                  >
                    Open
                  </button>)
              }
              <button
                type="button"
                className="PostsList__button button"
                onClick={() => removePost(post.id)}
              >
                Remove
              </button>
            </div>
          </li>))
        : (<h3> No Posts found</h3>)
      }
    </ul>
  </div>
)};
