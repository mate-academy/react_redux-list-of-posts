import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Card, Icon, Image as ImageTag, Button } from 'semantic-ui-react';
import User from './User';
import Comments from './Comments';
import {
  getPosts,
} from '../store/store';
import {
  createActionDeletePost,
} from '../store/actions';

const PostItem = ({ post, deletePost }) => {
  const { title, body, id, user, comments } = post;
  const img = [
    'https://react.semantic-ui.com/images/avatar/large/matthew.png',
    'https://react.semantic-ui.com/images/avatar/large/elliot.jpg',
    'https://react.semantic-ui.com/images/avatar/large/daniel.jpg',
    'https://react.semantic-ui.com/images/avatar/large/steve.jpg',
    'https://react.semantic-ui.com/images/avatar/large/molly.png',
    'https://react.semantic-ui.com/images/avatar/large/jenny.jpg',
  ];
  const rnd = Math.floor(Math.random() * (6));

  return (
    <>
      <ImageTag
        src={img[rnd]}
        size="mini"
        ui={false}
      />
      <Card.Content>
        <Card.Header><User currentUser={user} /></Card.Header>
        <p />
        <Card.Header>{title}</Card.Header>
        <Card.Meta>
          <p className="date">
            {id}
          </p>
          <p className="date">{body}</p>
          <p className="date">
            Joined in 20
            {Math.floor(10 + Math.random() * (19 + 1 - 10))}
          </p>
        </Card.Meta>
        <Card.Description>
          <Comments currentComments={comments} />
        </Card.Description>
      </Card.Content>
      <Card.Content extra>
        <a href="./#">
          <Icon name="user" />
          {Math.floor(Math.random() * (100 + 1 - 1))}
          {' '}
          Friends
        </a>
        <Card.Description>
          <Button primary onClick={() => deletePost(id)} basic color="red">
          DELETE
          </Button>
        </Card.Description>
      </Card.Content>
    </>
  );
};

const mapStateToProps = state => ({
  combineData: getPosts(state),
});

const mapDispatchToProps = {
  deletePost: createActionDeletePost,
};

export default connect(mapStateToProps, mapDispatchToProps)(PostItem);

PostItem.propTypes = {
  deletePost: PropTypes.func.isRequired,
  post: PropTypes.shape({
    id: PropTypes.number,
    title: PropTypes.string,
    body: PropTypes.string,
    user: PropTypes.objectOf(PropTypes.any),
    comments: PropTypes.arrayOf(PropTypes.any),
  }).isRequired,
};
