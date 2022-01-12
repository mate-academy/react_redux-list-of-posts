import { FC, useState } from 'react';
import { useDispatch } from 'react-redux';
import { useTypedSelector } from '../../../hooks/useTypedSelector';
import { PostsActionsCreator } from '../../../store/posts';
import { Comment } from '../../../types/Comment';
import { AddComment } from '../../Form/AddComment/AddComment';
import { Wrapper } from './Wrapper';

type Props = {
  show: boolean,
  handleClose: () => void,
};

export const PostDetails: FC<Props> = ({ show, handleClose }) => {
  const [showComments, setShowComments] = useState(true);
  const { postDetails, commentsPost } = useTypedSelector(state => state.posts);
  const dispatch = useDispatch();

  const handleDelete = (id: number) => {
    dispatch(PostsActionsCreator.deleteFetchComment(id));
  };

  return (
    <Wrapper
      show={show}
      handleClose={handleClose}
      title="Posts details"
    >
      <>
        <p>
          {postDetails?.body}
        </p>
        <hr />
        {Boolean(commentsPost.length) && (
          <>
            <div className="d-flex align-items-center justify-content-between mb-4">
              <h4 className="mb-0">Comments:</h4>
              <button
                type="button"
                className="btn btn-outline-dark"
                onClick={() => setShowComments(!showComments)}
              >
                {showComments ? 'Hide' : 'Show'}
              </button>
            </div>
            {showComments && (
              <ul>
                {commentsPost.map((comment: Comment) => (
                  <li
                    key={comment.id}
                    className="d-flex align-items-center justify-content-between mb-2"
                  >
                    <span className="text-break pr-3">{comment.body}</span>
                    <button
                      type="button"
                      className="btn btn-warning"
                      onClick={() => handleDelete(comment.id)}
                    >
                      X
                    </button>
                  </li>
                ))}
              </ul>
            )}
            <hr />
          </>
        )}

        <AddComment postId={postDetails?.id} />
      </>
    </Wrapper>
  );
};
