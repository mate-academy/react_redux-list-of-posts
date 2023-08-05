import React, { useEffect } from 'react';
import 'bulma/bulma.sass';
import '@fortawesome/fontawesome-free/css/all.css';
import './App.scss';

import { PostsList } from './components/PostsList';
import { UserSelector } from './components/UserSelector';
import { useAppDispatch, useAppSelector } from './app/hooks';
import { fetchUsers } from './features/usersSlice';
import { Loader } from './components/Loader';
import Sidebar from './components/Sidebar';
import Wrapper from './components/Wrapper';
import { fetchUserPosts, setPosts } from './features/postsSlice';
import { changeSelectedPost } from './features/selectedPost';

export const App: React.FC = () => {
  const author = useAppSelector(state => state.author.author);
  const posts = useAppSelector(state => state.posts.items);
  const isLoading = useAppSelector(state => state.posts.isLoading);
  const hasError = useAppSelector(state => state.posts.hasError);

  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(fetchUsers());
  }, [dispatch]);

  function loadUserPosts(userId: number) {
    dispatch(fetchUserPosts(userId));
  }

  useEffect(() => {
    dispatch(changeSelectedPost(null));

    if (author) {
      loadUserPosts(author.id);
    } else {
      dispatch(setPosts(null));
    }
  }, [author?.id]);

  return (
    <Wrapper>
      <div className="tile is-parent">
        <div className="tile is-child box is-success">
          <div className="block">
            <UserSelector />
          </div>

          <div className="block" data-cy="MainContent">
            {!author && (
              <p data-cy="NoSelectedUser">
                No user selected
              </p>
            )}

            {author && isLoading && (
              <Loader />
            )}

            {author && !isLoading && hasError && (
              <div
                className="notification is-danger"
                data-cy="PostsLoadingError"
              >
                Something went wrong!
              </div>
            )}

            {author && !isLoading && !hasError && posts?.length === 0 && (
              <div className="notification is-warning" data-cy="NoPostsYet">
                No posts yet
              </div>
            )}

            {author && !isLoading && !hasError && Boolean(posts?.length) && (
              <PostsList />
            )}
          </div>
        </div>
      </div>
      <Sidebar />
    </Wrapper>
  );
};
