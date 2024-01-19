import React, { useEffect, useState } from 'react';
import 'bulma/bulma.sass';
import '@fortawesome/fontawesome-free/css/all.css';
import './App.scss';
import { useDispatch } from 'react-redux';
import classNames from 'classnames';
import { PostsList } from './components/PostsList';
import { PostDetails } from './components/PostDetails';
import { UserSelector } from './components/UserSelector';
import { Loader } from './components/Loader';
// import { getUserPosts } from './api/posts';
// import { User } from './types/User';
// import { Post } from './types/Post';
import { getUsers } from './api/users';
import { set as selectPost } from './features/selectedPost/selectedPost';

import { actions as usersActions } from './features/users/usersSlice';
import {
  actions as postsActions,
  fetchUserPosts,
  loadingStatus,
} from './features/posts/postsSlice';
import { useAppSelector } from './app/hooks';

export const App: React.FC = () => {
  const dispatch = useDispatch();
  // const [posts, setPosts] = useState<Post[]>([]);
  // const [loaded, setLoaded] = useState(false);
  // const [hasError, setError] = useState(false);

  // const [author, setAuthor] = useState<User | null>(null);
  // const [selectedPost, setSelectedPost] = useState<Post | null>(null);

  const author = useAppSelector(state => state.author.author);
  const posts = useAppSelector(state => state.posts.posts);
  const error = useAppSelector(state => state.posts.hasError);
  const loaded = useAppSelector(state => state.posts
    .loaded === loadingStatus.succeeded);
  const selectedPost = useAppSelector(state => state.selectedPost.post);

  /*   function loadUserPosts1(userId: number) {
    setLoaded(false);
    fetchUserPosts(userId);

    getUserPosts(userId)
    // fetchUserPosts(userId)
      .then(postsFromServ => dispatch(postsActions.set(postsFromServ)))
      .catch(() => setError(true))
      // We disable the spinner in any case
      .finally(() => setLoaded(true));
  } */

  function loadUserPosts(userId: number) {
    dispatch(fetchUserPosts(userId));
  }

  useEffect(() => {
    getUsers()
      .then(users => dispatch(usersActions.set(users)));
  }, [dispatch]);

  useEffect(() => {
    // we clear the post when an author is changed
    // not to confuse the user
    // setSelectedPost(null);
    dispatch(selectPost(undefined));

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
                <UserSelector /* value={author} */ /* onChange={setAuthor} */ />
              </div>

              <div className="block" data-cy="MainContent">
                {!author && (
                  <p data-cy="NoSelectedUser">
                    No user selected
                  </p>
                )}

                {author && !loaded && (
                  <Loader />
                )}

                {author && loaded && error && (
                  <div
                    className="notification is-danger"
                    data-cy="PostsLoadingError"
                  >
                    Something went wrong!
                    {error}
                  </div>
                )}

                {author && loaded && !error && posts.length === 0 && (
                  <div className="notification is-warning" data-cy="NoPostsYet">
                    No posts yet
                  </div>
                )}

                {author && loaded && !error && posts.length > 0 && (
                  <PostsList />
                  // posts={posts}
                  // selectedPostId={selectedPost?.id}
                  // onPostSelected={setSelectedPost}
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
              {selectedPost && (
                <PostDetails /* post={selectedPost} */ />
              )}
            </div>
          </div>
        </div>
      </div>
    </main>
  );
};
