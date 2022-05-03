import React, { useState } from 'react';
import { Post } from '../../types/posts';
import { Comment } from '../../types/comment';
import './PostDetails.scss';

interface Props {
  selectedPost: number,
}

export const PostDetails: React.FC<Props> = () => {
  const [postDetails] = useState<Post | null>(null);
  const [comments] = useState<Comment[]>([]);
  const [showedComments, setShowedComments] = useState(true);

  const hideCommment = () => {
    setShowedComments(comment => {
      if (comment) {
        return false;
      }

      return true;
    });
  };

  return (
    <div className="PostDetails">
      <h2>Post details:</h2>
      <section className="PostDetails__post">
        <p>{postDetails?.body}</p>
      </section>
      {comments.length > 0 && (
        <section className="PostDetails__comments">
          <button
            type="button"
            className="button"
            onClick={hideCommment}
          >
            {showedComments ? (
              `Hide ${comments.length} comments`
            ) : (
              `Show ${comments.length} comments`
            )}
          </button>
          { showedComments && (
            <ul className="PostDetails__list">
              {comments.map(comment => (
                <li key={comment.id} className="PostDetails__list-item">
                  <button
                    type="button"
                    className="PostsList__button button"
                  >
                    X
                  </button>
                  <p>{comment.body}</p>
                </li>
              ))}
            </ul>
          )}
        </section>
      )}
      <section>
        <div className="PostDetails__form-wrapper">
          {/* <NewCommentForm /> */}
        </div>
      </section>
    </div>
  );
};
