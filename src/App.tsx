import React, { useEffect } from 'react';
import 'bulma/bulma.sass';
import '@fortawesome/fontawesome-free/css/all.css';
import './App.scss';

import classNames from 'classnames';
import { PostsList } from './components/PostsList';
import { PostDetails } from './components/PostDetails';
import { UserSelector } from './components/UserSelector';
import { Loader } from './components/Loader';
import { Post } from './types/Post';
import { Counter } from './features/counter/Counter';
import { useAppDispatch, useAppSelector } from './app/hooks';
import { loadApiPosts, setPosts } from './features/postsSlice';
import { loadApiUsers } from './features/usersSlice';
import { setPost } from './features/selectedPostSlice';

export const App: React.FC = () => {
  // const [posts, setPosts] = useState<Post[]>([]);
  // const [loaded, setLoaded] = useState(false);
  // const [hasError, setError] = useState(false);

  // const [author, setAuthor] = useState<User | null>(null);
  // const [selectedPost, setSelectedPost] = useState<Post | null>(null);

  const dispatch = useAppDispatch();
  const { items, hasError, loaded } = useAppSelector(state => state.posts);
  const author = useAppSelector(state => state.author.author);
  const selectedPost = useAppSelector(state => state.selectedPost.post);
  const setSelectedPost = (post: Post | null) => {
    dispatch(setPost(post));
  };

  // function loadUserPosts(userId: number) {
  //   setLoaded(false);

  //   getUserPosts(userId)
  //     .then(setPosts)
  //     .catch(() => setError(true))
  //     // We disable the spinner in any case
  //     .finally(() => setLoaded(true));
  // }

  useEffect(() => {
    dispatch(loadApiUsers());
  }, []);

  useEffect(() => {
    // we clear the post when an author is changed
    // not to confuse the user
    setSelectedPost(null);

    if (author) {
      dispatch(loadApiPosts(author.id));
    } else {
      dispatch(setPosts([]));
    }
  }, [author?.id]);

  return (
    <main className="section">
      <Counter />

      <div className="container">
        <div className="tile is-ancestor">
          <div className="tile is-parent">
            <div className="tile is-child box is-success">
              <div className="block">
                <UserSelector />
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

                {author && loaded && hasError && (
                  <div
                    className="notification is-danger"
                    data-cy="PostsLoadingError"
                  >
                    Something went wrong!
                  </div>
                )}

                {author && loaded && !hasError && !items.length && (
                  <div className="notification is-warning" data-cy="NoPostsYet">
                    No posts yet
                  </div>
                )}

                {author && loaded && !hasError && !!items.length && (
                  <PostsList
                    posts={items}
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
              {selectedPost && (
                <PostDetails post={selectedPost} />
              )}
            </div>
          </div>
        </div>
      </div>
    </main>
  );
};
