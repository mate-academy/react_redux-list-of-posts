import React, { useEffect } from 'react';
import classNames from 'classnames';

import 'bulma/css/bulma.css';
import '@fortawesome/fontawesome-free/css/all.css';
import './App.scss';

import { PostsList } from './components/PostsList';
import { PostDetails } from './components/PostDetails';
import { UserSelector } from './components/UserSelector';
import { Loader } from './components/Loader';
import { User } from './types/User';
import { useAppDispatch, useAppSelector } from './app/hooks';
import * as authorActions from './features/author/authorSlice';
import { clearPosts, postsAsync } from './features/posts/postsSlice';
import { setPost } from './features/selectedPost/selectedPostSlice';
import { Post } from './types/Post';

export const App: React.FC = () => {
  //const [posts, setPosts] = useState<Post[]>([]);
  //const [loaded, setLoaded] = useState(false);
  //const [hasError, setError] = useState(false);

  const {
    items: posts,
    hasError,
    loaded,
  } = useAppSelector(state => state.posts);

  const dispatch = useAppDispatch();
  const author = useAppSelector(state => state.author);
  //const [author, setAuthor] = useState<User | null>(null);
  //const [selectedPost, setSelectedPost] = useState<Post | null>(null);

  const selectedPost = useAppSelector(state => state.selectedPost);

  const handleUserChange = (newUser: User) => {
    dispatch(authorActions.set(newUser));
  };

  const handleSetPost = (post: Post | null) => {
    dispatch(setPost(post));
  };

  function loadUserPosts(userId: number) {
    dispatch(postsAsync(userId));
  }

  useEffect(() => {
    // we clear the post when an author is changed
    // not to confuse the user
    dispatch(setPost(null));

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
                <UserSelector value={author} onChange={handleUserChange} />
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
                    onPostSelected={handleSetPost}
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
