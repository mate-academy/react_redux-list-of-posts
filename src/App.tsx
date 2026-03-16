import React from 'react';
import classNames from 'classnames';
import { useDispatch, useSelector } from 'react-redux';

import 'bulma/css/bulma.css';
import '@fortawesome/fontawesome-free/css/all.css';
import './App.scss';

import { PostsList } from './components/PostsList';
import { PostDetails } from './components/PostDetails';
import { UserSelector } from './components/UserSelector';
import { Loader } from './components/Loader';

import { RootState, AppDispatch } from './app/store';
import { setAuthor } from './features/author/authorSlice';
import { setPosts, setLoaded, setHasError } from './features/posts/postsSlice';
import { setSelectedPost } from './features/selectedPost/selectedPostsSlice';

import { getUserPosts } from './api/posts';
import { User } from './types/User';

export const App: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();

  // Достаём данные из Redux
  const author = useSelector((state: RootState) => state.author.selected);
  const posts = useSelector((state: RootState) => state.posts.items);
  const loaded = useSelector((state: RootState) => state.posts.loaded);
  const hasError = useSelector((state: RootState) => state.posts.hasError);
  const selectedPost = useSelector(
    (state: RootState) => state.selectedPost.post,
  );

  // Загрузка постов по userId
  function loadUserPosts(userId: number) {
    dispatch(setLoaded(false));

    getUserPosts(userId)
      .then(postsArray => {
        dispatch(setPosts(postsArray));
        dispatch(setHasError(false));
      })
      .catch(() => dispatch(setHasError(true)))
      .finally(() => dispatch(setLoaded(true)));
  }

  // Когда выбираем нового юзера
  function handleUserChange(user: User | null) {
    dispatch(setAuthor(user));
    dispatch(setSelectedPost(null));

    if (user) {
      loadUserPosts(user.id);
    } else {
      dispatch(setPosts([]));
    }
  }

  return (
    <main className="section">
      <div className="container">
        <div className="tile is-ancestor">
          <div className="tile is-parent">
            <div className="tile is-child box is-success">
              <div className="block">
                <UserSelector value={author} onChange={handleUserChange} />
              </div>

              <div className="block" data-cy="MainContent">
                {!author && <p data-cy="NoSelectedUser">No user selected</p>}

                {author && !loaded && <Loader />}

                {author && loaded && hasError && (
                  <div
                    className="notification is-danger"
                    data-cy="PostsLoadingError"
                  >
                    Something went wrong!
                  </div>
                )}

                {author && loaded && !hasError && posts.length === 0 && (
                  <div className="notification is-warning" data-cy="NoPostsYet">
                    No posts yet
                  </div>
                )}

                {author && loaded && !hasError && posts.length > 0 && (
                  <PostsList
                    posts={posts}
                    selectedPostId={selectedPost?.id}
                    onPostSelected={post => dispatch(setSelectedPost(post))}
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
