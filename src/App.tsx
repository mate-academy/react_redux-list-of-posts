import React, { useEffect } from 'react';
import classNames from 'classnames';

import 'bulma/css/bulma.css';
import '@fortawesome/fontawesome-free/css/all.css';
import './App.scss';

import { PostsList } from './components/PostsList';
import { PostDetails } from './components/PostDetails';
import { UserSelector } from './components/UserSelector';
import { Loader } from './components/Loader';
//import { getUserPosts } from './api/posts';
// import { User } from './types/User';
// import { Post } from './types/Post';
import { useAppDispatch, useAppSelector } from './app/hooks';
import { loadPosts, setPosts } from './features/postsSlice';
import { setSelectedPost } from './features/selectedPostSlice';
import { Counter } from './features/counter/Counter';

export const App: React.FC = () => {
  // const [posts, setPosts] = useState<Post[]>([]);
  // const [loaded, setLoaded] = useState(false);
  // const [hasError, setError] = useState(false);
  const dispatch = useAppDispatch();

  // const [author, setAuthor] = useState<User | null>(null);
  const author = useAppSelector(state => state.author.author);
  // const [selectedPost, setSelectedPost] = useState<Post | null>(null);
  const selectedPost = useAppSelector(state => state.selectedPost.selectedPost);
  const {
    items: posts,
    hasError,
    loading: loadingInProgress,
  } = useAppSelector(state => state.posts);

  // function loadUserPosts(userId: number) {
  // setLoaded(false);
  //
  //  getUserPosts(userId)
  //    .then(setPosts)
  //    .catch(() => setError(true))
  // We disable the spinner in any case
  //   .finally(() => setLoaded(true));
  //}

  useEffect(() => {
    // we clear the post when an author is changed
    // not to confuse the user
    //setSelectedPost(null);
    dispatch(setSelectedPost(null));

    if (author) {
      // loadUserPosts(author.id);
      dispatch(loadPosts(author.id));
    } else {
      // setPosts([]);
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
                {/*<UserSelector value={author} onChange={setAuthor} />*/}
                <Counter />
                <UserSelector />
              </div>

              <div className="block" data-cy="MainContent">
                {!author && <p data-cy="NoSelectedUser">No user selected</p>}

                {author && loadingInProgress && <Loader />}

                {author && !loadingInProgress && hasError && (
                  <div
                    className="notification is-danger"
                    data-cy="PostsLoadingError"
                  >
                    Something went wrong!
                  </div>
                )}

                {author &&
                  !loadingInProgress &&
                  !hasError &&
                  posts.length === 0 && (
                    <div
                      className="notification is-warning"
                      data-cy="NoPostsYet"
                    >
                      No posts yet
                    </div>
                  )}

                {author &&
                  !loadingInProgress &&
                  !hasError &&
                  posts.length > 0 && <PostsList />}
                {/*} <PostsList
                    posts={posts}
                    selectedPostId={selectedPost?.id}
                    onPostSelected={setSelectedPost}
                  />*/}
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
              {selectedPost && <PostDetails />}
              {/* post={selectedPost} */}
            </div>
          </div>
        </div>
      </div>
    </main>
  );
};
