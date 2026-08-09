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
import { useAppDispatch } from '../src/app/hooks';
import { useAppSelector } from '../src/app/hooks';
import { setPosts, setLoaded, setHasError } from './features/posts/postsSlice';
import { setUsers } from './features/users/usersSlice';
import { setAuthor } from './features/author/authorSlice';
import { setSelectedPost } from './features/selectedPost/selectedPostSlice';
import { getUsers } from './api/users';

export const App: React.FC = () => {
  // const [posts, setPosts] = useState<Post[]>([]);
  // const [loaded, setLoaded] = useState(false);
  // const [hasError, setError] = useState(false);
  // const [author, setAuthor] = useState<User | null>(null);
  // const [selectedPost, setSelectedPost] = useState<Post | null>(null);

  const dispatch = useAppDispatch();

  const users = useAppSelector(state => state.users.items);
  const author = useAppSelector(state => state.author.value);
  const selectedPost = useAppSelector(state => state.selectedPost.value);

  const posts = useAppSelector(state => state.posts.items);
  const loaded = useAppSelector(state => state.posts.loaded);
  const hasError = useAppSelector(state => state.posts.hasError);

  useEffect(() => {
    getUsers().then(data => {
      dispatch(setUsers(data));
    });
  }, [dispatch]);

  useEffect(() => {
    function loadUserPosts(userId: number) {
      dispatch(setLoaded(false));

      getUserPosts(userId)
        .then(data => {
          dispatch(setPosts(data));
          dispatch(setHasError(false));
        })
        .catch(() => dispatch(setHasError(true)))
        // We disable the spinner in any case
        .finally(() => dispatch(setLoaded(true)));
    }
    // we clear the post when an author is changed
    // not to confuse the user

    dispatch(setSelectedPost(null));

    if (author) {
      loadUserPosts(author.id);
    } else {
      dispatch(setPosts([]));
    }
  }, [author, dispatch]);

  return (
    <main className="section">
      <div className="container">
        <div className="tile is-ancestor">
          <div className="tile is-parent">
            <div className="tile is-child box is-success">
              <div className="block">
                <UserSelector
                  value={author}
                  onChange={user => dispatch(setAuthor(user))}
                  users={users}
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
