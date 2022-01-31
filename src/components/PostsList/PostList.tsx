import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchPosts, fetchUsers } from '../../api/api';
import { showPostInfoAction } from '../../store/postsReducer';
import { RootState } from '../../types/RootState';
import { PostItem } from '../PostsItem/PostItem';

import classes from './PostList.module.scss';

export const PostList:React.FC = () => {
  const [selectedUser, setSelectedUser] = useState(2);
  const dispatch = useDispatch();
  const posts = useSelector((state: RootState) => state.postsReducer.posts);
  const visiblePosts = posts.filter(post => {
    if (selectedUser) {
      return post.userId === selectedUser;
    }

    return post;
  });
  const users = useSelector((state:RootState) => state.usersReducer.users);

  useEffect(() => {
    dispatch(fetchPosts());
    dispatch(fetchUsers());
  }, []);

  return (
    <div className={classes.postList}>
      <div className="select" style={{ width: 'max-content' }}>
        <select
          onChange={(e) => {
            setSelectedUser(+e.target.value);
            dispatch(showPostInfoAction(-1));
          }}
        >
          <option value="0">All</option>
          {users.map(user => (
            <option key={user.id} value={user.id}>{user.name}</option>
          ))}
        </select>
      </div>
      {visiblePosts.map(post => (
        <PostItem key={post.id} post={post} />
      ))}
    </div>
  );
};
