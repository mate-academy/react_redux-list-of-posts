/* eslint-disable */
import React, { useEffect, useState } from 'react';
import 'bulma/bulma.sass';
import '@fortawesome/fontawesome-free/css/all.css';
import './App.scss';

import classNames from 'classnames';
import { PostsList } from './components/PostsList';
import { PostDetails } from './components/PostDetails';
import { UserSelector } from './components/UserSelector';
import { Loader } from './components/Loader';
// import { getUserPosts } from './api/posts';
// import { User } from './types/User';
import { Post } from './types/Post';


import { users } from './components/UsersContext';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from './app/store';
import type { AppDispatch } from './app/store';
// import { post } from 'cypress/types/jquery';
import { posts } from './components/PostsContext';
import { useAppSelector } from './app/hooks';


export const App: React.FC = () => {
  // const [posts, setPosts] = useState<Post[]>([]);
  // const [loaded, setLoaded] = useState(false);
  // const [hasError, setError] = useState(false);

  // const [author, setAuthor] = useState<User | null>(null);

  const userSelect = useAppSelector(state => state.selectedUser)
  const loading = useSelector((state: RootState) => state.users.loading);
  const hasError = useSelector((state: RootState) => state.users.error);
  const postsUser = useSelector((state: RootState) => state.userPosts.posts)


  const [selectedPost, setSelectedPost] = useState<Post | null>(null);
  
  const dispatch = useDispatch<AppDispatch>();

  // function loadUserPosts(userId: number) {
  //   setLoaded(false);

  //   getUserPosts(userId)
  //     .then(setPosts)
  //     .catch(() => setError(true))
  //     // We disable the spinner in any case
  //     .finally(() => setLoaded(true));
  // }

    useEffect(() => {
      dispatch(users())
  }, []);

  useEffect(() => {
    if (userSelect.selectedUser?.id) {
      dispatch(posts(userSelect.selectedUser?.id))
    }
    
}, []);

  // useEffect(() => {
  //   // we clear the post when an author is changed
  //   // not to confuse the user
  //   setSelectedPost(null);

  //   if (userSelect) {
  //     loadUserPosts(userSelect.id);
  //   } else {
  //     setPosts([]);
  //   }
  // }, [userSelect]);

  return (
    <main className="section">
      <div className="container">
        <div className="tile is-ancestor">
          <div className="tile is-parent">
            <div className="tile is-child box is-success">
              <div className="block">
                <UserSelector />
              </div>

              <div className="block" data-cy="MainContent">
                {!userSelect && <p data-cy="NoSelectedUser">No user selected</p>}

                {!loading && userSelect && <Loader />}

                {userSelect && loading && hasError && (
                  <div
                    className="notification is-danger"
                    data-cy="PostsLoadingError"
                  >
                    Something went wrong!
                  </div>
                )}

                {userSelect && loading && !hasError && posts.length === 0 && (
                  <div className="notification is-warning" data-cy="NoPostsYet">
                    No posts yet
                  </div>
                )}

                {userSelect && loading && !hasError && posts.length > 0 && (
                  <PostsList
                    postsUser={postsUser}
                    selectedPostId={selectedPost?.id}
                    onPostSelected={setSelectedPost}
                  />
                )}
              </div>
            </div>
          </div>

          <div
            data-cy="Sidebar"
            className={classNames(
              'tile',
              'is-parent',
              'is-8-desktop',
              'Sidebar',
              {
                'Sidebar--open': selectedPost,
              },
            )}
          >
            <div className="tile is-child box is-success ">
              {selectedPost && <PostDetails post={selectedPost} />}
            </div>
          </div>
        </div>
      </div>
    </main>
  );
};
