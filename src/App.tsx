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
// import { User } from './types/User';
// import { Post } from './types/Post';
import {
  setPosts,
  setError,
  setLoaded,
  setSelectedPost,
} from './features/Posts.reducers.actions';
import { setAuthor } from './features/Author.reducers.actions';
import { useSelector, useDispatch } from 'react-redux';
import { RootState, AppDispatch } from './app/store';

// import { useDispatch, useSelector } from 'react-redux';
// import { AppDispatch, RootState } from './app/store';

export const App: React.FC = () => {
  // const [posts, setPosts] = useState<Post[]>([]);
  // const posts = useSelector((state: RootState) => state.posts.items);
  const posts = useSelector((state: RootState) => state.posts);
  const hasError = useSelector((state: RootState) => state.posts.hasError);
  const loaded = useSelector((state: RootState) => state.posts.loaded);
  const author = useSelector((state: RootState) => state.author.author);
  const selectedPost = useSelector(
    (state: RootState) => state.posts.selectedPost,
  );
  // const dispatch = useDispatch<AppDispatch>();

  const dispatch = useDispatch<AppDispatch>();

  function loadUserPosts(userId: number) {
    // setLoaded(false);
    dispatch(setLoaded(false));
    dispatch(setError(false));

    getUserPosts(userId)
      .then(data => dispatch(setPosts(data)))
      .catch(error => {
        dispatch(setError(true));
        // eslint-disable-next-line no-console
        console.error(error);
      })
      // We disable the spinner in any case
      .finally(() => {
        dispatch(setLoaded(true));
      });
  }

  useEffect(() => {
    // we clear the post when an author is changed
    // not to confuse the user
    dispatch(setSelectedPost(null));

    if (author) {
      loadUserPosts(author.id);
    } else {
      // eslint-disable-next-line no-console
      console.log('test');
    }
  }, [author]);

  return (
    <main className="section">
      <div className="container">
        <div className="tile is-ancestor">
          <div className="tile is-parent">
            <div className="tile is-child box is-success">
              <div className="block">
                <UserSelector onChange={auth => dispatch(setAuthor(auth))} />
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

                {author && loaded && !hasError && posts.items.length === 0 && (
                  <div className="notification is-warning" data-cy="NoPostsYet">
                    No posts yet
                  </div>
                )}

                {author && loaded && !hasError && posts.items.length > 0 && (
                  <PostsList
                    posts={posts.items}
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
