import React, { useEffect } from 'react';
import classNames from 'classnames';

import 'bulma/css/bulma.css';
import '@fortawesome/fontawesome-free/css/all.css';
import './App.scss';

import { PostsList } from './components/PostsList';
import { PostDetails } from './components/PostDetails';
import { UserSelector } from './components/UserSelector';
import { Loader } from './components/Loader';
import { getUserPosts } from './api/posts';
import { useSelector } from 'react-redux';
import { actions as postActions } from './app/postsSlice';
import { useAppDispatch } from './app/hooks';
import { actions as authorActions } from './app/authorSlice';
import { actions as selectedPostActions } from './app/selectedPostSlice';
import { RootState } from './app/store';

export const App: React.FC = () => {
  const dispatch = useAppDispatch();
  const author = useSelector((state: RootState) => state.author.author);
  const {
    loaded,
    hasError,
    items: posts,
  } = useSelector((state: RootState) => state.posts);
  const selectedPost = useSelector(
    (state: RootState) => state.selectedPost.selectedPost,
  );

  function loadUserPosts(userId: number) {
    dispatch(postActions.setLoaded(false));

    getUserPosts(userId)
      .then(_posts => dispatch(postActions.setPosts(_posts)))
      .catch(() => dispatch(postActions.setError(true)))
      // We disable the spinner in any case
      .finally(() => dispatch(postActions.setLoaded(true)));
  }

  useEffect(() => {
    // we clear the post when an author is changed
    // not to confuse the user
    dispatch(selectedPostActions.setSelectedPost(null));

    if (author) {
      loadUserPosts(author.id);
    } else {
      dispatch(postActions.setPosts([]));
    }
  }, [author]);

  return (
    <main className="section">
      <div className="container">
        <div className="tile is-ancestor">
          <div className="tile is-parent">
            <div className="tile is-child box is-success">
              <div className="block">
                <UserSelector
                  value={author}
                  onChange={user => dispatch(authorActions.setAuthor(user))}
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
                    onPostSelected={post =>
                      dispatch(selectedPostActions.setSelectedPost(post))
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
