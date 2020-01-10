import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import { Comment as CommentTag, Icon, Message } from 'semantic-ui-react';

const Comments = ({ currentComments }) => (
  <>
    {currentComments.map(({ email, body, id, name: userName }) => (
      <Fragment key={id}>

        <CommentTag.Group>
          <CommentTag>
            <CommentTag.Avatar
              as="a"
              src="https://react.semantic-ui.com/images/avatar/small/stevie.jpg"
            />
            <CommentTag.Content>
              <CommentTag.Author>
                <Message>
                  <Message.Header>{userName}</Message.Header>
                  <p>
                    {body}
                  </p>
                </Message>

                <p />
                {email}
              </CommentTag.Author>
              <CommentTag.Metadata>
                <div>2 days ago</div>
                <div>
                  <Icon name="star" />
                  5 Faves
                </div>
              </CommentTag.Metadata>
            </CommentTag.Content>
          </CommentTag>
        </CommentTag.Group>
      </Fragment>
    ))
    }
  </>
);

export default Comments;

Comments.propTypes = {
  currentComments: PropTypes.arrayOf(PropTypes.any).isRequired,
};
