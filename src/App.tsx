import React, { useCallback, useEffect } from 'react';
import classNames from 'classnames';

import 'bulma/css/bulma.css';
import '@fortawesome/fontawesome-free/css/all.css';
import './App.scss';

import { PostsList } from './components/PostsList';
import { PostDetails } from './components/PostDetails';
import { UserSelector } from './components/UserSelector';
import { Loader } from './components/Loader';
import { getUserPosts } from './api/posts';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from './app/store';
import { authorActions } from './features/author/author';
import { selectedPostActions } from './features/selectedPost/selectedPost';
import { postsActions } from './features/posts/posts';

export const App: React.FC = () => {
  const dispatch = useDispatch();

  const { posts, loaded, hasError } = useSelector(
    (state: RootState) => state.posts,
  );

  const author = useSelector((state: RootState) => state.author);
  const selectedPost = useSelector((state: RootState) => state.selectedPost);

  const loadUserPosts = useCallback(
    (userId: number) => {
      dispatch(postsActions.setLoaded(false));

      getUserPosts(userId)
        .then(readyPosts => dispatch(postsActions.setPosts(readyPosts)))
        .catch(() => dispatch(postsActions.setHasError(true)))
        .finally(() => dispatch(postsActions.setLoaded(true)));
    },
    [dispatch],
  );

  useEffect(() => {
    // we clear the post when an author is changed
    // not to confuse the user
    dispatch(selectedPostActions.setSelectedPost(null));

    if (author) {
      loadUserPosts(author.id);
    } else {
      dispatch(postsActions.setPosts([]));
    }
  }, [author, dispatch, loadUserPosts]);

  return (
    <main className="section">
      <div className="container">
        <div className="tile is-ancestor">
          <div className="tile is-parent">
            <div className="tile is-child box is-success">
              <div className="block">
                <UserSelector
                  value={author}
                  onChange={newAuthor =>
                    dispatch(authorActions.setAuthor(newAuthor))
                  }
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
                    onPostSelected={newSelectedPost =>
                      dispatch(
                        selectedPostActions.setSelectedPost(newSelectedPost),
                      )
                    }
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
