import React from 'react';

import '@fortawesome/fontawesome-free/css/all.css';
import 'bulma/css/bulma.css';
import './App.scss';

import { useAppDispatch, useAppSelector } from './app/hooks';
import { UserSelector } from './components/UserSelector';
import { setAuthor } from './features/author/authorSlice';
import { User } from './types/User';

export const App: React.FC = () => {
  // const [posts, setPosts] = useState<Post[]>([]);
  // const [loaded, setLoaded] = useState(false);
  // const [hasError, setError] = useState(false);
  // const [selectedPost, setSelectedPost] = useState<Post | null>(null);

  const { author } = useAppSelector(state => state.author);
  const dispatch = useAppDispatch();

  const handleAuthorChange = (currUser: User) => {
    dispatch(setAuthor(currUser));
  };

  // eslint-disable-next-line no-console

  // function loadUserPosts(userId: number) {
  //   setLoaded(false);

  //   getUserPosts(userId)
  //     .then(setPosts)
  //     .catch(() => setError(true))
  //     // We disable the spinner in any case
  //     .finally(() => setLoaded(true));
  // }

  // useEffect(() => {
  //   // we clear the post when an author is changed
  //   // not to confuse the user
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
                <UserSelector value={author} onChange={handleAuthorChange} />
              </div>

              <div className="block" data-cy="MainContent">
                {!author && <p data-cy="NoSelectedUser">No user selected</p>}

                {/* {author && !loaded && <Loader />}

                {author && loaded && hasError && (
                  <div
                    className="notification is-danger"
                    data-cy="PostsLoadingError"
                  >
                    Something went wrong!
                  </div>
                )} */}

                {/* {author && loaded && !hasError && posts.length === 0 && ( */}
                {author && (
                  <div className="notification is-warning" data-cy="NoPostsYet">
                    No posts yet
                  </div>
                )}

                {/* {author && loaded && !hasError && posts.length > 0 && (
                  <PostsList
                    posts={posts}
                    selectedPostId={selectedPost?.id}
                    onPostSelected={setSelectedPost}
                  />
                )} */}
              </div>
            </div>
          </div>

          {/* <div
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
          </div> */}
        </div>
      </div>
    </main>
  );
};
