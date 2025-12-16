import React, { useEffect } from 'react';
import classNames from 'classnames';

import 'bulma/css/bulma.css';
import '@fortawesome/fontawesome-free/css/all.css';
import './App.scss';

import { PostsList } from './components/PostsList';
import { PostDetails } from './components/PostDetails';
import { UserSelector } from './components/UserSelector';
import { Loader } from './components/Loader';
import { useAppDispatch, useAppSelector } from './app/hooks';
import { initPosts, setSelectedPost } from './features/PostsSlice';

export const App: React.FC = () => {
  const dispatch = useAppDispatch();
  // const [posts, setPosts] = useState<Post[]>([]);
  // const [loaded, setLoaded] = useState(false);
  // const [hasError, setError] = useState(false);

  // const [author, setAuthor] = useState<User | null>(null);
  // const [selectedPost, setSelectedPost] = useState<Post | null>(null);

  const { loaded, hasError, posts, selectedPost } = useAppSelector(
    state => state.posts,
  );
  const selectedUser = useAppSelector(state => state.users.selectedUser);

  useEffect(() => {
    dispatch(setSelectedPost(null));

    if (selectedUser) {
      dispatch(initPosts(selectedUser.id));
    } else {
      dispatch(initPosts(0)); // або окремий clearPosts, якщо є
    }
  }, [selectedUser, dispatch]);

  // function loadUserPosts(userId: number) {
  //   setLoaded(false);

  //   getUserPosts(userId)
  //     .then(setPosts)
  //     .catch(() => setError(true))
  //     // We disable the spinner in any case
  //     // Ми вимикаємо спінер у будь-якому випадку
  //     .finally(() => setLoaded(true));
  // }

  // useEffect(() => {
  //   // we clear the post when an author is changed
  //   // not to confuse the user
  //   // ми очищуємо публікацію, коли змінюється автор
  //   // щоб не заплутати користувача
  //   setSelectedPost(null);

  //   if (author) {
  //     loadUserPosts(author.id);
  //   } else {
  //     setPosts([]);
  //   }
  // }, [author]);

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
                {!selectedUser && (
                  <p data-cy="NoSelectedUser">No user selected</p>
                )}

                {selectedUser && !loaded && <Loader />}

                {selectedUser && loaded && hasError && (
                  <div
                    className="notification is-danger"
                    data-cy="PostsLoadingError"
                  >
                    Something went wrong!
                  </div>
                )}

                {selectedUser && loaded && !hasError && posts.length === 0 && (
                  <div className="notification is-warning" data-cy="NoPostsYet">
                    No posts yet
                  </div>
                )}

                {selectedUser && loaded && !hasError && posts.length > 0 && (
                  <PostsList posts={posts} selectedPost={selectedPost} />
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
