import React, { useCallback, useEffect } from 'react';
import 'bulma/bulma.sass';
import '@fortawesome/fontawesome-free/css/all.css';
import './App.scss';

import classNames from 'classnames';
import { PostsList } from './components/PostsList';
import { PostDetails } from './components/PostDetails';
import { UserSelector } from './components/UserSelector';
import { Loader } from './components/Loader';
import { Post } from './types/Post';
import * as usersActions from './features/users';
import * as postsActions from './features/posts';
import { useAppDispatch, useAppSelector } from './app/hooks';
import {
  actions as selectedPostsActions,
  SelectedPostState,
} from './features/selectedPost';

export const App: React.FC = () => {
  const dispatch = useAppDispatch();
  const authorState = useAppSelector(state => state.author);
  const selectedPostState: SelectedPostState = useAppSelector(
    state => state.selectedPost,
  );
  const postsState: postsActions.PostsState = useAppSelector(
    state => state.posts,
  );

  useEffect(() => {
    dispatch(usersActions.init());
  }, [dispatch]);

  const handleSetSelectedPost = useCallback(
    (currentPost: Post | null) =>
      dispatch(selectedPostsActions.set(currentPost)),
    [dispatch],
  );

  // function loadUserPosts(userId: number) {
  //   setLoaded(false);

  //   getUserPosts(userId)
  //     .then(setPosts)
  //     .catch(() => setError(true))
  //     // We disable the spinner in any case
  //     .finally(() => setLoaded(true));
  // }

  // const loadUserPosts = useCallback(
  //   (userId: number) => {
  //     dispatch(postsActions.setLoading(true));

  //     getUserPosts(userId)
  //       .then(items => dispatch(postsActions.set(items)))
  //       .catch(() => dispatch(postsActions.setError(true)))
  //       .finally(() => dispatch(postsActions.setLoading(false)));
  //   },
  //   [dispatch],
  // );

  useEffect(() => {
    // we clear the post when an author is changed
    // not to confuse the user
    handleSetSelectedPost(null);

    if (authorState?.author) {
      dispatch(postsActions.init(authorState?.author.id));
    } else {
      dispatch(postsActions.actions.setPosts([]));
    }
  }, [authorState, dispatch, handleSetSelectedPost]);

  const postsError =
    authorState?.author && postsState?.loaded && postsState?.hasError;

  const noPosts =
    authorState?.author &&
    postsState?.loaded &&
    !postsState?.hasError &&
    postsState?.posts.length === 0;

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
                {!authorState?.author && (
                  <p data-cy="NoSelectedUser">No user selected</p>
                )}

                {authorState?.author && !postsState?.loaded && <Loader />}

                {postsError && (
                  <div
                    className="notification is-danger"
                    data-cy="PostsLoadingError"
                  >
                    Something went wrong!
                  </div>
                )}

                {noPosts && (
                  <div className="notification is-warning" data-cy="NoPostsYet">
                    No posts yet
                  </div>
                )}

                {authorState?.author &&
                  postsState?.loaded &&
                  !postsState?.hasError &&
                  postsState?.posts.length > 0 && <PostsList />}
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
                'Sidebar--open': selectedPostState.selectedPost,
              },
            )}
          >
            <div className="tile is-child box is-success ">
              {selectedPostState.selectedPost !== null ? (
                <PostDetails />
              ) : (
                <span>Choose a post</span>
              )}
            </div>
          </div>
        </div>
      </div>
    </main>
  );
};
