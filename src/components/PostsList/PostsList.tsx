import { FC, useCallback, useState } from 'react';
import { useDispatch } from 'react-redux';
import { PostsActionsCreator } from '../../store/posts';
import { Post } from '../../types/Post';
import { ModalPostDetails } from '../Modals';
import { PostListItem } from './components/PostListItem/PostListItem';

type Props = {
  posts: Post[];
};

export const PostsList: FC<Props> = ({ posts }) => {
  const dispatch = useDispatch();
  const [modalOpen, setModalOpen] = useState(false);

  const handleClose = useCallback(() => {
    setModalOpen(false);
  }, [modalOpen]);

  const handleShowModal = useCallback((id) => {
    dispatch(PostsActionsCreator.fetchDetailsPost(id));
    dispatch(PostsActionsCreator.fetchCommentsPost(id));

    setModalOpen(true);
  }, []);

  return (
    <div className="wrapper">
      {posts.length > 0 ? (
        <ul>
          {posts.map((post: Post) => (
            <PostListItem
              key={post.id}
              post={post}
              handleShowModal={handleShowModal}
            />
          ))}
        </ul>
      ) : (
        <h3>Posts not found</h3>
      )}

      <ModalPostDetails
        show={modalOpen}
        handleClose={handleClose}
      />
    </div>
  );
};
