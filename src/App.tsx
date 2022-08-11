import { PostsList } from './components/PostsList';
import { PostDetails } from './components/PostDetails';
import { UserSelector } from './components/UserSelector';
import { Loader } from './components/Loader';
import { clientAPI } from './store/clientApi';
import { useAppSelector } from './store/hooks';

export const App: React.FC = () => {
  const { author } = useAppSelector(state => state.author);
  // eslint-disable-next-line max-len
  const { selectedPost } = useAppSelector(state => state.selectedPost);
  const {
    data: posts = [],
    isLoading,
    isError,
  } = clientAPI.useFetchAllPostsQuery(author?.id);
  // const dispatch = useAppDispatch();

  return (
    <main className="section">
      <div className="container">
        <div className="tile is-ancestor">
          <div className="tile is-parent">
            <div className="tile is-child box is-success">
              <div className="block">
                <UserSelector />
              </div>

              <div className="block">
                {!author && (
                  <p>No user selected</p>
                )}

                {author && isLoading && (
                  <Loader />
                )}

                {author && isLoading && isError && (
                  <div className="notification is-danger">
                    Something went wrong!
                  </div>
                )}

                {
                // eslint-disable-next-line max-len
                  author && isLoading && !isError && posts && posts.length === 0 && (
                    <div className="notification is-warning">
                      No posts yet
                    </div>
                  )
                }

                {
                // eslint-disable-next-line max-len
                  author && !isLoading && !isError && posts && posts.length > 0 && (
                    <PostsList />
                  )
                }
              </div>
            </div>
          </div>

          <div className="tile is-parent is-8-desktop">
            <div className="tile is-child box is-success ">
              {selectedPost ? (
                <PostDetails post={selectedPost} />
              ) : (
                <p>Choose a post</p>
              )}
            </div>
          </div>
        </div>
      </div>
    </main>
  );
};
