import React, { useEffect, useState } from 'react';
import 'bulma/bulma.sass';
import '@fortawesome/fontawesome-free/css/all.css';
import './App.scss';

import classNames from 'classnames';
import { PostsList } from './components/PostsList';
import { PostDetails } from './components/PostDetails';
import { UserSelector } from './components/UserSelector';
import { Loader } from './components/Loader';
import { getUserPosts } from './api/posts';
import { Post } from './types/Post';
import { useAppDispatch, useAppSelector } from './app/hooks';
import { setLoaded, setError } from './features/posts';
import { setAuthor } from './features/author';
import { User } from './types/User';

export const App: React.FC = () => {
  const dispatch = useAppDispatch();

  const loaded = useAppSelector(state => state.users.loaded);
  const hasError = useAppSelector(state => state.users.error);
  const author = useAppSelector(state => state.author.author);

  const [posts, setPosts] = useState<Post[]>([]);

  const [selectedPost, setSelectedPost] = useState<Post | null>(null);

  useEffect(() => {
    const loadUserPosts = async (userId: number) => {
      dispatch(setLoaded(false));

      try {
        const tempPosts = await getUserPosts(userId);

        setPosts(tempPosts);
      } catch {
        dispatch(setError(true));
      } finally {
        dispatch(setLoaded(true));
      }
    };

    if (author) {
      loadUserPosts(author.id);
    } else {
      setPosts([]);
    }
  }, [author, dispatch]);

  const handleUserChange = (user: User) => {
    dispatch(setAuthor(user));
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
