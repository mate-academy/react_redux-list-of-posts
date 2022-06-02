import {
  memo,
  useEffect,
} from 'react';
import { NewCommentForm } from '../NewCommentForm';
import {
  selectors,
  fetchPostDetails,
  setCommentsIsShowing,
  removeCommentInSelectedPostById,
} from '../../store/postDetailsSlice';
import {
  useAppDispatch,
  useAppSelector,
} from '../../typedHooks/hooks';
import { Loader } from '../Loader';

import './PostDetails.scss';

type Props = {
  selectedPostId: number;
};

export const PostDetails: React.FC<Props> = memo(({
  selectedPostId,
}) => {
  const dispatch = useAppDispatch();

  const selectedPostDetails = useAppSelector(selectors.getSelectedPostDetails);
  const commentsForSelectedPost
    = useAppSelector(selectors.getCommentsForSelectedPost);
  const commentsIsShowing = useAppSelector(selectors.getCommentsIsShowing);
  const someCommentIsDeleting
    = useAppSelector(selectors.getSomeCommentIsDeleting);

  useEffect(() => {
    dispatch(fetchPostDetails(selectedPostId));
  }, [selectedPostId]);

  return (
    <>
      {selectedPostDetails && (
        <div className="PostDetails">
          <h2>Post details:</h2>

          <section className="PostDetails__post">
            <p>{selectedPostDetails?.body}</p>
          </section>

          <section className="PostDetails__comments">
            <button
              type="button"
              className="button"
              onClick={() => {
                dispatch(setCommentsIsShowing(!commentsIsShowing));
              }}
            >
              {`${commentsIsShowing ? 'Hide' : 'Show'} ${commentsForSelectedPost.length} comments`}
            </button>

            {(commentsIsShowing && commentsForSelectedPost.length > 0) && (
              <ul className="PostDetails__list">
                {commentsForSelectedPost.map(comment => (
                  <li className="PostDetails__list-item" key={comment.id}>
                    <button
                      type="button"
                      className="PostDetails__remove-button button"
                      onClick={() => {
                        dispatch(removeCommentInSelectedPostById(comment.id));
                      }}
                    >
                      {someCommentIsDeleting ? <Loader /> : 'X'}
                    </button>
                    <p>{comment.body}</p>
                  </li>
                ))}
              </ul>
            )}
          </section>

          <section>
            <div className="PostDetails__form-wrapper">
              <NewCommentForm
                selectedPostId={selectedPostId}
              />
            </div>
          </section>
        </div>
      )}
      {!selectedPostDetails && (
        <Loader />
      )}
    </>
  );
});
