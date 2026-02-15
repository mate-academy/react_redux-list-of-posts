import React, { useEffect, useState } from 'react';
import classNames from 'classnames';

import 'bulma/css/bulma.css';
import '@fortawesome/fontawesome-free/css/all.css';
import './App.scss';

import { PostsList } from './components/PostsList';
import { PostDetails } from './components/PostDetails';
import { UserSelector } from './components/UserSelector';
import { Loader } from './components/Loader';
import { User } from './types/User';
import { Post } from './types/Post';
import { useAppDispatch, useAppSelector } from './app/hooks';
import { postsSlice } from './features/posts/postsSlice';
import { authorSlice } from './features/author/authorSlice';
import { selectedPostSlice } from './features/selectedPost/selectedPostSlice';

export const App: React.FC = () => {
  const [loaded, setLoaded] = useState(false);
  const [hasError, setError] = useState(false);

  const dispatch = useAppDispatch();
  const { posts } = useAppSelector(state => state.posts);
  const { author } = useAppSelector(state => state.author);
  const { selectedPost } = useAppSelector(state => state.selectedPost);

  useEffect(() => {
    dispatch(selectedPostSlice.actions.clearSelectedPost());

    if (author) {
      setLoaded(false);
      setError(false);

      dispatch(postsSlice.actions.loadUserPosts(author.id))
        .unwrap()
        .catch(() => setError(true))
        .finally(() => setLoaded(true));
    }
  }, [author, dispatch]);

  const handlePostSelected = (newSelectedPost: Post | null) => {
    if (newSelectedPost) {
      dispatch(selectedPostSlice.actions.setSelectedPost(newSelectedPost));
    } else {
      dispatch(selectedPostSlice.actions.clearSelectedPost());
    }
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
                  onChange={(newAuthor: User) =>
                    dispatch(authorSlice.actions.setAuthor(newAuthor))
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
                    onPostSelected={handlePostSelected}
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
