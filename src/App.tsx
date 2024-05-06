import React from 'react';
import 'bulma/bulma.sass';
import '@fortawesome/fontawesome-free/css/all.css';
import './App.scss';

import classNames from 'classnames';
import { PostsList } from './components/PostsList';
import { PostDetails } from './components/PostDetails';

import { UserSelector } from './components/UserSelector';
import { actions as usersActions } from './features/usersSlice';
import * as usersService from './api/users';

import { actions as authorActions } from './features/authorSlice';
import { actions as postsActions } from './features/postsSlice';
import { actions as selectedPostActions } from './features/selectedPostSlice';

import { Loader } from './components/Loader';
import { getUserPosts } from './api/posts';

import { useAppDispatch, useAppSelector } from './app/hooks';
import { Post } from './types/Post';

export const App: React.FC = () => {
  const author = useAppSelector(state => state.author.author);
  const { posts, loaded, hasError } = useAppSelector(state => state.posts);
  const selectedPost = useAppSelector(state => state.selectedPost.post);

  const dispatch = useAppDispatch();

  const loadUserPosts = React.useCallback(
    (userId: number) => {
      dispatch(postsActions.setLoaded(false));

      getUserPosts(userId)
        .then(localPosts => dispatch(postsActions.set(localPosts)))
        .catch(() => dispatch(postsActions.setError()))
        .finally(() => dispatch(postsActions.setLoaded(true)));
    },
    [dispatch],
  );

  React.useEffect(() => {
    usersService.getUsers().then(users => {
      dispatch(usersActions.set(users));
    });

    dispatch(selectedPostActions.set(null));

    if (author) {
      loadUserPosts(author.id);
    } else {
      dispatch(postsActions.set([]));
    }
  }, [author, dispatch, loadUserPosts]);

  const handleOnPostSelected = (post: Post | null) => {
    dispatch(selectedPostActions.set(post));
  };

  return (
    <main className="section">
      <div className="container">
        <div className="tile is-ancestor">
          <div className="tile is-parent">
            <div className="tile is-child box is-success">
              <div className="block">
                <UserSelector
                  value={author}
                  onChange={user => dispatch(authorActions.set(user))}
                />
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
                    onPostSelected={handleOnPostSelected}
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
