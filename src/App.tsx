import React, { useEffect } from 'react';
import 'bulma/bulma.sass';
import '@fortawesome/fontawesome-free/css/all.css';
import './App.scss';

import classNames from 'classnames';
import { PostsList } from './components/PostsList';
import { PostDetails } from './components/PostDetails';
import { UserSelector } from './components/UserSelector';
import { Loader } from './components/Loader';
// import { getUserPosts } from './api/posts';
// import { User } from './types/User';
// import { Post } from './types/Post';
// import { Counter } from './features/counter/Counter';
import { useAppDispatch, useAppSelector } from './app/hooks';
import * as usersActions from './features/users/usersSlice';

export const App: React.FC = () => {
  // const [posts, setPosts] = useState<Post[]>([]);
  // const [loaded, setLoaded] = useState(false);
  // const [hasError, setError] = useState(false);

  // const [author, setAuthor] = useState<User | null>(null);
  // const [selectedPost, setSelectedPost] = useState<Post | null>(null);

  const dispatch = useAppDispatch();
  const { error } = useAppSelector((state) => state.users);
  const { author } = useAppSelector((state) => state.author);
  const { post: selectedPost } = useAppSelector(state => state.selectedPost);
  const {
    items: posts,
    loaded,
    hasError,
  } = useAppSelector((state) => state.posts);

  // function loadUserPosts(userId: number) {
  //   setLoaded(false);

  //   getUserPosts(userId)
  //     .then(setPosts)
  //     .catch(() => setError(true))
  //     // We disable the spinner in any case
  //     .finally(() => setLoaded(true));
  // }

  useEffect(() => {
    dispatch(usersActions.init());
  }, []);

  // useEffect(() => {
  //   // we clear the post when an author is changed
  //   // not to confuse the user
  //   setSelectedPost(null);

  //   // eslint-disable-next-line no-console
  //   console.log(loaded);

  //   if (author) {
  //     loadUserPosts(author.id);
  //   } else {
  //     setPosts([]);
  //   }
  // }, [author?.id]);

  // if (loading) {
  //   return <Loader />;
  // }

  if (error) {
    return <p>{error}</p>;
  }

  return (
    <main className="section">
      {/* Learn the Redux Toolkit usage example in src/app and src/features/counter */}
      {/* <Counter /> */}

      <div className="container">
        <div className="tile is-ancestor">
          <div className="tile is-parent">
            <div className="tile is-child box is-success">
              <div className="block">
                <UserSelector />
                {
                  // value={author}
                  // onChange={setAuthor}
                }
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
                  <PostsList />
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
              {selectedPost
                ? <PostDetails />
                : <p>Choose a post</p>}
            </div>
          </div>
        </div>
      </div>
    </main>
  );
};
