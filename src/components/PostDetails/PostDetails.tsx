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
          <div>
            <h2>Post details:</h2>
            <section className="PostDetails__post">
              <p>{selectedPostDetails?.body}</p>
            </section>
            <section className="PostDetails__comments">
              <button
                type="button"
                className="button PostDetails__show-hide-button"
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
                        className="btn-close PostDetails__remove-button"
                        onClick={() => {
                          dispatch(removeCommentInSelectedPostById(comment.id));
                        }}
                        aria-label="Close"
                        disabled={someCommentIsDeleting}
                      />
                      <p>{comment.body}</p>
                    </li>
                  ))}
                </ul>
              )}
            </section>
          </div>

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
