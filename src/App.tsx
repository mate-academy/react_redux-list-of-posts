import React, { useEffect } from 'react';
import 'bulma/bulma.sass';
import '@fortawesome/fontawesome-free/css/all.css';
import './App.scss';

import classNames from 'classnames';
import { PostsList } from './components/PostsList';
import { PostDetails } from './components/PostDetails';
import { UserSelector } from './components/UserSelector';
import { Loader } from './components/Loader';
import { useAppDispatch, useAppSelector } from './app/hooks';
import { fetchPosts, selectPosts } from './slices/postsSlice';
import { setAuthor, selectAuthor } from './slices/authorSlice';
import {
  setSelectedPost,
  selectSelectedPost,
} from './slices/selectedPostSlice';
import { User } from './types/User';

export const App: React.FC = () => {
  const dispatch = useAppDispatch();
  const author = useAppSelector(selectAuthor);
  const {
    items: posts,
    loaded: postsLoaded,
    hasError: postsError,
  } = useAppSelector(selectPosts);
  const selectedPost = useAppSelector(selectSelectedPost);

  useEffect(() => {
    if (author) {
      dispatch(fetchPosts(author.id));
    }
  }, [author, dispatch]);

  const handleUserChange = (user: User) => {
    dispatch(setAuthor(user));
    dispatch(setSelectedPost(null));
  };

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

                {author && !postsLoaded && <Loader />}

                {author && postsLoaded && postsError && (
                  <div
                    className="notification is-danger"
                    data-cy="PostsLoadingError"
                  >
                    Something went wrong!
                  </div>
                )}

                {author && postsLoaded && !postsError && posts.length === 0 && (
                  <div className="notification is-warning" data-cy="NoPostsYet">
                    No posts yet
                  </div>
                )}

                {author && postsLoaded && !postsError && posts.length > 0 && (
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
