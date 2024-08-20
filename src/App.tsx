import React, { useEffect, useState } from 'react';
import 'bulma/bulma.sass';
import '@fortawesome/fontawesome-free/css/all.css';
import './App.scss';

import classNames from 'classnames';
import { PostsList } from './components/PostsList';
import { PostDetails } from './components/PostDetails';
import { UserSelector } from './components/UserSelector';
import { Loader } from './components/Loader';
import { useAppDispatch, useAppSelector } from './app/hooks';
import { actions as authorActions } from './features/author/authorSlice';
import { actions as postsActions } from './features/posts/postsSlice';
import { getUserPosts } from './api/posts';
import { Post } from './types/Post';

export const App: React.FC = () => {
  // const [posts, setPosts] = useState<Post[]>([]);
  const {
    items: posts,
    loaded,
    hasError,
  } = useAppSelector(state => state.posts);
  // const [loaded, setLoaded] = useState(false);
  // const [hasError, setError] = useState(false);

  const { author } = useAppSelector(state => state.author);
  const dispatch = useAppDispatch();

  const [selectedPost, setSelectedPost] = useState<Post | null>(null);

  function loadUserPosts(userId: number) {
    // setLoaded(false);
    dispatch(postsActions.isLoaded(false));

    getUserPosts(userId)
      .then(userPosts => dispatch(postsActions.set(userPosts)))
      // .catch(() => setError(true))
      .catch(() => dispatch(postsActions.isError(true)))
      // We disable the spinner in any case
      // .finally(() => setLoaded(true));
      .finally(() => dispatch(postsActions.isLoaded(true)));
  }

  useEffect(() => {
    // we clear the post when an author is changed
    // not to confuse the user
    setSelectedPost(null);

    if (author) {
      loadUserPosts(author.id);
    } else {
      // setPosts([]);
      dispatch(postsActions.set([]));
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
                  onChange={newAuthor =>
                    dispatch(authorActions.change(newAuthor))
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
                    onPostSelected={setSelectedPost}
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
