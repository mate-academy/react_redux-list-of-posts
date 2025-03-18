/* eslint-disable @typescript-eslint/indent */
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
import { fetchUsers } from './features/user/usersThunk';
import { fetchPosts } from './features/post/postsThunk';
import { setPost } from './features/post/postSlice';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from './app/store';
import { Post } from './types/Post';

export const App: React.FC = () => {
  const posts = useSelector((state: RootState) => state.posts);
  //const [posts, setPosts] = useState<Post[]>([]);
  //const [loaded, setLoaded] = useState(false);
  //const [hasError, setError] = useState(false);

  //const [author, setAuthor] = useState<User | null>(null);
  //const [selectedPost, setSelectedPost] = useState<Post | null>(null);
  const dispatch = useDispatch<AppDispatch>();
  const author = useSelector((state: RootState) => state.author);
  const selectedPost = useSelector((state: RootState) => state.post);

  useEffect(() => {
    dispatch(fetchUsers());
  }, [dispatch]);

  /* function loadUserPosts(userId: number) {
    setLoaded(false);

    getUserPosts(userId)
      .then(setPosts)
      .catch(() => setError(true))
      // We disable the spinner in any case
      .finally(() => setLoaded(true));
  } */

  useEffect(() => {
    // we clear the post when an author is changed
    // not to confuse the user
    //setSelectedPost(null);
    dispatch(setPost({} as Post));

    if (author) {
      dispatch(fetchPosts(author.id));
    } else {
      dispatch(fetchPosts(null));
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

                {author && !posts.loaded && <Loader />}

                {author && posts.loaded && posts.hasError && (
                  <div
                    className="notification is-danger"
                    data-cy="PostsLoadingError"
                  >
                    Something went wrong!
                  </div>
                )}

                {author &&
                  posts.loaded &&
                  !posts.hasError &&
                  posts.posts.length === 0 && (
                    <div
                      className="notification is-warning"
                      data-cy="NoPostsYet"
                    >
                      No posts yet
                    </div>
                  )}
                {author &&
                  posts.loaded &&
                  !posts.hasError &&
                  posts.posts.length > 0 && <PostsList />}
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
                'Sidebar--open': selectedPost.id > 0,
              },
            )}
          >
            <div className="tile is-child box is-success ">
              {selectedPost.id > 0 ? <PostDetails /> : <p>Choose a Post</p>}
            </div>
          </div>
        </div>
      </div>
    </main>
  );
};
