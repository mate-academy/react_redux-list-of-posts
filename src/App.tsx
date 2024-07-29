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
// import { User } from './types/User';
// import { Post } from './types/Post';
import { useAppDispatch, useAppSelector } from './app/hooks';
import { postSlice } from './features/postSlice';
import { selectedPostSlice } from './features/selectedPostSlice';
// import { authorSlice } from './features/authorSlice';

export const App: React.FC = () => {
  const dispatch = useAppDispatch();
  const { hasError, items, loaded } = useAppSelector(state => state.postSlice);
  const { author } = useAppSelector(state => state.authorSlice);
  const { post } = useAppSelector(state => state.selectedPostSlice);
  //   const [posts, setPosts] = useState<Post[]>([]);
  //   const [loaded, setLoaded] = useState(false);
  //   const [hasError, setError] = useState(false);

  // const [author, setAuthor] = useState<User | null>(null);
  // const [selectedPost, setSelectedPost] = useState<Post | null>(null);

  function loadUserPosts(userId: number) {
    dispatch(postSlice.actions.setLoaded(false));

    getUserPosts(userId)
      .then(response => dispatch(postSlice.actions.set(response)))
      .catch(() => dispatch(postSlice.actions.setHasError(true)))
      // We disable the spinner in any case
      .finally(() => dispatch(postSlice.actions.setLoaded(true)));
  }

  useEffect(() => {
    // we clear the post when an author is changed
    // not to confuse the user
    // setSelectedPost(null);
    dispatch(selectedPostSlice.actions.set(null));

    if (author) {
      loadUserPosts(author.id);
    } else {
      dispatch(postSlice.actions.set([]));
    }
  }, [author, dispatch]);

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

                {author && loaded && !hasError && items.length === 0 && (
                  <div className="notification is-warning" data-cy="NoPostsYet">
                    No posts yet
                  </div>
                )}

                {author && loaded && !hasError && items.length > 0 && (
                  <PostsList posts={items} />
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
                'Sidebar--open': post,
              },
            )}
          >
            <div className="tile is-child box is-success ">
              {post && <PostDetails post={post} />}
            </div>
          </div>
        </div>
      </div>
    </main>
  );
};
