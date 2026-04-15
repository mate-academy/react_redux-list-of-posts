import React, { useEffect } from 'react';
import classNames from 'classnames';

import 'bulma/css/bulma.css';
import '@fortawesome/fontawesome-free/css/all.css';
import './App.scss';

import { PostsList } from './components/PostsList';
import { PostDetails } from './components/PostDetails';
import { UserSelector } from './components/UserSelector';
import { Loader } from './components/Loader';
import { Post } from './types/Post';
import { useAppDispatch, useAppSelector } from './app/hooks';
import {
  postsHasError,
  postsList,
  postsLoaded,
  postsAsync,
} from './features/posts/postsSlice';
import { authorUser, setAuthor } from './features/author/authorSlice';
import { User } from './types/User';
import {
  selectedPost,
  setSelectedPost,
} from './features/selectedPost/selectedPostSlice';
import { usersAsync } from './features/users/usersSlice';

export const App: React.FC = () => {
  const dispatch = useAppDispatch();

  const posts = useAppSelector(postsList);
  const selectedPostValue = useAppSelector(selectedPost);
  const loaded = useAppSelector(postsLoaded);
  const hasError = useAppSelector(postsHasError);
  const author = useAppSelector(authorUser);

  // Moved from React useState.
  function handleAuthorChange(user: User) {
    dispatch(setAuthor(user));
  }

  function handlePostSelect(post: Post | null) {
    dispatch(setSelectedPost(post));
  }

  useEffect(() => {
    dispatch(usersAsync());
  }, [dispatch]);

  useEffect(() => {
    // we clear the post when an author is changed
    // not to confuse the user
    dispatch(setSelectedPost(null));

    if (author) {
      dispatch(postsAsync(author.id));
    }
  }, [author, dispatch]);

  return (
    <main className="section">
      <div className="container">
        <div className="tile is-ancestor">
          <div className="tile is-parent">
            <div className="tile is-child box is-success">
              <div className="block">
                <UserSelector value={author} onChange={handleAuthorChange} />
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
                    selectedPostId={selectedPostValue?.id}
                    onPostSelected={handlePostSelect}
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
                'Sidebar--open': selectedPostValue,
              },
            )}
          >
            <div className="tile is-child box is-success ">
              {selectedPostValue && <PostDetails post={selectedPostValue} />}
            </div>
          </div>
        </div>
      </div>
    </main>
  );
};
