import React, { useEffect } from 'react';
import 'bulma/css/bulma.css';
import '@fortawesome/fontawesome-free/css/all.css';
import './App.scss';
import { useAppDispatch, useAppSelector } from './app/hooks';
import { fetchUsers } from './slices/usersSlice';
import { fetchUserPosts } from './slices/postsSlice';
import { setSelectedPost, clearSelectedPost } from './slices/selectedPostSlice';
import { UserSelector } from './components/UserSelector';
import { PostsList } from './components/PostsList';
import { PostDetails } from './components/PostDetails';
import { Loader } from './components/Loader';
import './App.scss';

export const App: React.FC = () => {
  const dispatch = useAppDispatch();
  const { items: users, loading: usersLoading } = useAppSelector(
    state => state.users,
  );
  const {
    items: posts,
    loading: postsLoading,
    error: postsError,
  } = useAppSelector(state => state.posts);
  const selectedPost = useAppSelector(state => state.selectedPost);

  useEffect(() => {
    dispatch(fetchUsers());
  }, [dispatch]);

  const handleUserChange = (userId: number | null) => {
    if (userId) {
      dispatch(fetchUserPosts(userId));
    } else {
      dispatch(clearSelectedPost());
    }
  };

  return (
    <main className="section">
      <div className="container">
        <div className="tile is-ancestor">
          <div className="tile is-parent">
            <div className="tile is-child box">
              <UserSelector
                users={users}
                onChange={handleUserChange}
                loading={usersLoading}
              />
              {!usersLoading && users.length === 0 && (
                <p className="has-text-centered">No user selected</p>
              )}
              {postsLoading && <Loader />}
              {!postsLoading && postsError && (
                <div className="notification is-danger">
                  Something went wrong while fetching posts.
                </div>
              )}
              {!postsLoading && !postsError && posts.length > 0 && (
                <PostsList
                  posts={posts}
                  selectedPostId={selectedPost?.id || null}
                  onPostSelected={post => dispatch(setSelectedPost(post))}
                />
              )}
            </div>
          </div>

          <div className="tile is-parent is-8">
            <div className="tile is-child box">
              {selectedPost ? (
                <PostDetails post={selectedPost} />
              ) : (
                <p className="has-text-centered">Choose a post</p>
              )}
            </div>
          </div>
        </div>
      </div>
    </main>
  );
};
