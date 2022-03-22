import { useState } from 'react';
import { useSelector } from 'react-redux';
import { getPostCommentsSelector, getPostDetailsSelector } from '../../store/selectors';
import { NewCommentForm } from '../NewCommentForm';
import './PostDetails.scss';

export const PostDetails: React.FC = () => {
  const [commentsHidden, setCommentsHidden] = useState(true);

  const postDetails: Post | null = useSelector(getPostDetailsSelector);
  const postComments: PostComment[] = useSelector(getPostCommentsSelector);

  return (
    <div className="PostDetails">
      <h2>Post details:</h2>

      {postDetails
        && (
          <section className="PostDetails__post">
            <p>{postDetails.body}</p>
          </section>
        )}

      <section className="PostDetails__comments">
        <button
          type="button"
          className="button"
          onClick={() => setCommentsHidden(!commentsHidden)}
        >
          {`${commentsHidden ? 'Show' : 'Hide'} ${postComments.length} comments`}
        </button>

        {!commentsHidden
          && (
            <ul className="PostDetails__list">
              {postComments.map(comment => (
                <li
                  key={comment.id}
                  className="PostDetails__list-item"
                >
                  <button
                    type="button"
                    className="PostDetails__remove-button button"
                  // onClick={() => removeComment(comment.id)}
                  >
                    X
                  </button>
                  <p>{`User [${comment.name}] says: ${comment.body}`}</p>
                </li>
              ))}
            </ul>
          )}
      </section>

      <section>
        <div className="PostDetails__form-wrapper">
          {postDetails && !commentsHidden && <NewCommentForm postId={postDetails.id} />}
        </div>
      </section>
    </div>
  );
};
