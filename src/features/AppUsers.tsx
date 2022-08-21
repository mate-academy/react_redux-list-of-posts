import React, { useEffect, useState } from 'react';

import 'bulma/bulma.sass';
import '@fortawesome/fontawesome-free/css/all.css';

import { useParams } from 'react-router-dom';
import { PostsList } from '../components/PostsList';
import { PostDetails } from '../components/PostDetails';
import { UserSelector } from '../components/UserSelector';
import { Loader } from '../components/Loader';
import { Post } from '../types/Post';
import { useGetPostsQuery, useGetUsersQuery } from '../api/generalApi';
import { User } from '../types/User';
// import { Counter } from './counter/Counter';

export const AppUsers: React.FC = () => {
  const [selectedPost, setSelectedPost] = useState<Post | null>(null);

  const { data: users = [] } = useGetUsersQuery();
  const { userId, postId } = useParams();

  const [
    selectedUser, setSelectedUser,
  ] = useState<User | null >(null);

  useEffect(() => {
    if (userId) {
      const curentUser = users
        .find(user => user.id === +userId.split('-').reverse()[0]);

      setSelectedUser(curentUser || null);
    }
  }, [userId, users.length]);

  const {
    data = [],
    isLoading,
    isError,
  } = useGetPostsQuery(userId ? +userId.split('-').reverse()[0] : null);

  useEffect(() => {
    if (postId) {
      const curentPost = data
        .find(post => post.id === +postId.split('-').reverse()[0]) || null;

      setSelectedPost(curentPost);
    }
  }, [data.length]);

  return (
    <main className="section">
      {/* Learn the Redux Toolkit usage example in src/app and src/features/counter */}
      {/* <Counter /> */}
      <div className="container">
        <div className="tile is-ancestor">
          <div className="tile is-parent">
            <div className="tile is-child box is-success">
              <div className="block">
                <UserSelector
                  selectedUser={selectedUser}
                  onChange={setSelectedUser}
                />
              </div>
              <div className="block">
                {!selectedUser && (
                  <p>No user selected</p>
                )}

                {selectedUser && isLoading && (
                  <Loader />
                )}

                {selectedUser && isLoading && isError && (
                  <div className="notification is-danger">
                    Something went wrong!
                  </div>
                )}

                {selectedUser && !isLoading
                && !isError && data.length === 0 && (
                  <div className="notification is-warning">
                    No posts yet
                  </div>
                )}

                {selectedUser && !isLoading && !isError && data.length > 0 && (
                  <PostsList
                    posts={data}
                    selectedPostId={selectedPost?.id}
                    onPostSelected={setSelectedPost}
                  />
                )}
              </div>
            </div>
          </div>

          <div className="tile is-parent is-8-desktop">
            <div className="tile is-child box is-success ">
              {selectedPost ? (
                <PostDetails post={selectedPost} />
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
