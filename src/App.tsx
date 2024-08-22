import React, { useEffect } from 'react';
import 'bulma/bulma.sass';
import '@fortawesome/fontawesome-free/css/all.css';
import './App.scss';

import classNames from 'classnames';
import { PostsList } from './components/PostsList';
import { PostDetails } from './components/PostDetails';
import { UserSelector } from './components/UserSelector';
import { Loader } from './components/Loader';
import { getUserPosts } from './api/posts';
import { useAppDispatch, useAppSelector } from './app/hooks';
import { setAuthor } from './features/author/authorSlice';
import { actions as postsActions } from './features/posts/postsSlice';
import {
  deleteSelectedPost,
  setSelectedPost,
} from './features/selectedPost/selectedPostSlice';

export const App: React.FC = () => {
  const author = useAppSelector(state => state.author[0]);
  const { posts, loaded, hasError } = useAppSelector(state => state.posts);
  const selectedPost = useAppSelector(state => state.selectedPost[0]);
  const dispatch = useAppDispatch();

  function loadUserPosts(userId: number) {
    dispatch(postsActions.setLoaded(false));

    getUserPosts(userId)
      .then(serverPosts => dispatch(postsActions.setPosts(serverPosts)))
      .catch(() => dispatch(postsActions.setError(true)))
      .finally(() => dispatch(postsActions.setLoaded(true)));
  }

  useEffect(() => {
    dispatch(deleteSelectedPost());

    if (author) {
      loadUserPosts(author.id);
    } else {
      dispatch(postsActions.deletePosts());
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
                  onChange={value => dispatch(setAuthor(value))}
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
