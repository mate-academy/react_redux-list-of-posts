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
import { setAuthor } from './features/author';
import { User } from './types/User';
import { clearPosts } from './features/posts';
import { setSelectedPost } from './features/selectedPost';
import { Post } from './types/Post';
import { changeAsync } from './features/users';

export const App: React.FC = () => {
  const dispatch = useAppDispatch();
  const { author } = useAppSelector(state => state.author);
  const { posts, loading, error } = useAppSelector(state => state.posts);
  const { selectedPost } = useAppSelector(state => state.selectedPost);

  function loadUserPosts(userId: number) {
    dispatch(changeAsync(userId));
  }

  const setCurrentAuthor = (newAuthor: User) => {
    dispatch(setAuthor(newAuthor));
  };

  const handleSetSelectedPost = (post: Post | null) => {
    dispatch(setSelectedPost(post));
  };

  useEffect(() => {
    dispatch(setSelectedPost(null));

    if (author) {
      loadUserPosts(author.id);
    } else {
      dispatch(clearPosts());
    }
  }, [author]);

  return (
    <main className="section">
      <div className="container">
        <div className="tile is-ancestor">
          <div className="tile is-parent">
            <div className="tile is-child box is-success">
              <div className="block">
                <UserSelector value={author} onChange={setCurrentAuthor} />
              </div>

              <div className="block" data-cy="MainContent">
                {!author && <p data-cy="NoSelectedUser">No user selected</p>}

                {author && loading && <Loader />}

                {author && !loading && error && (
                  <div
                    className="notification is-danger"
                    data-cy="PostsLoadingError"
                  >
                    Something went wrong!
                  </div>
                )}

                {author && !loading && !error && posts.length === 0 && (
                  <div className="notification is-warning" data-cy="NoPostsYet">
                    No posts yet
                  </div>
                )}

                {author && !loading && !error && posts.length > 0 && (
                  <PostsList
                    posts={posts}
                    selectedPostId={selectedPost?.id}
                    onPostSelected={handleSetSelectedPost}
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
