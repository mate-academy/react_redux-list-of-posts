import React, { useEffect, useMemo } from 'react';
import { useLocation } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';

import './PostsList.scss';

import { getPostsList, getMessage } from '../../store';
import { fetchPosts } from '../../store/postsReducer';

import { Post } from '../../types';

import { PostItem } from "../PostItem";

type Props = {
  loading: boolean,
  selectedUserId: number,
};

export const PostsList: React.FC<Props> = React.memo(({ loading, selectedUserId }) => {
  const posts: Post[] = useSelector(getPostsList);
  const message = useSelector(getMessage);

  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  
  const queryTitle = searchParams.get('query') || null;

  const dispatch = useDispatch();

  useEffect(() => {
    if (selectedUserId > 0) {
      dispatch(fetchPosts(selectedUserId));
    } else {
      dispatch(fetchPosts());
    }
  }, [selectedUserId, dispatch]);

  const filteredPosts = useMemo(() => {
    if (queryTitle) {
      return posts.filter(post => post.title.includes(queryTitle.toLowerCase()));
    } else {
      return posts;
    }
  }, [posts, queryTitle]);

  return (
    <div className="PostsList">
      {loading && !message ? (
        <div className="loading"></div>
      ) : (
        <>
          <h2>Posts:</h2>
          <ul className="PostsList__list">
            {filteredPosts.length > 0
              ? filteredPosts.map((post: any) => (
                <li className="PostsList__item" key={post.id}>
                  <PostItem {...post} />
                </li>
              )) : (
                <p className="info">Posts list is empty.</p>
              )
            }
          </ul>
        </>
      )}
    </div>
  );
});
