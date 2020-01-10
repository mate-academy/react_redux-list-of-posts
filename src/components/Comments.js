import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import { Button,
  Comment as CommentTag,
  Icon,
  Message } from 'semantic-ui-react';
import {
  createActionDeleteComment,
} from '../store/actions';

const Comments = ({ currentComments, deleteComment }) => (
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
                  <p>
                    <span>Comments ID:</span>
                    {id}
                  </p>
                  <Message.Header>{userName}</Message.Header>
                  <p>
                    {body}
                  </p>
                  <p>
                    <Button onClick={() => deleteComment(id)} basic color="red">
                        delete comment
                    </Button>
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
const mapDispatchToProps = {
  deleteComment: createActionDeleteComment,
};

export default connect(null, mapDispatchToProps)(Comments);

Comments.propTypes = {
  deleteComment: PropTypes.func.isRequired,
  currentComments: PropTypes.arrayOf(PropTypes.any).isRequired,
};
