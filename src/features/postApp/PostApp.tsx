import React, { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import {
  fetchUsers,
  selectUser,
  usersSelector,
} from '../userSelector/userSelectorSlice';
import { selectPost } from '../postDetails/postDetailsSlice';
import { fetchUserPosts, setPosts } from '../postsList/postsListSlice';
import { UserSelector } from '../userSelector';
import { PostsList } from '../postsList';
import { PostDetails } from '../postDetails';

export const PostApp: React.FC = () => {
  const dispatch = useAppDispatch();
  const { selectedUser } = useAppSelector(usersSelector);
  const selectedPost = useAppSelector(usersSelector);

  const { userId } = useParams();

  useEffect(() => {
    dispatch(fetchUsers())
      .unwrap()
      .then(usersFromServer => {
        if (userId) {
          dispatch(selectUser(usersFromServer.find(user => user.id === +userId)
          || null));
        }
      });
  }, []);

  useEffect(() => {
    dispatch(selectPost(null));

    if (selectedUser) {
      dispatch(fetchUserPosts(selectedUser.id));
    } else {
      dispatch(setPosts([]));
    }
  }, [selectedUser?.id]);

  return (
    <main className="section">
      <div className="container">
        <div className="tile is-ancestor">
          <div className="tile is-parent">
            <div className="tile is-child box is-success">
              <div className="block">
                <UserSelector />
              </div>

              <div className="block">
                {selectedUser
                  ? <PostsList />
                  : <p>No user selected</p>}
              </div>
            </div>
          </div>

          <div className="tile is-parent is-8-desktop">
            <div className="tile is-child box is-success ">
              {selectedPost ? (
                <PostDetails />
              ) : (
                <p>Choose a post</p>
              )}
            </div>
          </div>
        </div>
      </div>
    </main>
  );
};
