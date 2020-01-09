import React from 'react';
import { Button, Header, Segment } from 'semantic-ui-react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { handleDelete } from '../redux/store';
import User from './User';
import CommentList from './CommentList';

const Post = (props) => {
  // eslint-disable-next-line no-shadow
  const { searchedText, title, body, comments, user, id, handleDelete } = props;

  const highlightText = (text) => {
    if (!searchedText) {
      return text;
    }

    const parts = text.split(new RegExp(`(${searchedText})`, 'gi'));

    return parts.map((part, i) => (
      <React.Fragment key={`${part + i}`}>
        {part.toLowerCase() === searchedText.toLowerCase()
          ? <span>{part}</span>
          : part}
      </React.Fragment>
    ));
  };

  return (
    <Segment className="posts" color="yellow">
      <Header as="h2">
        <span className="post-header">{highlightText(title)}</span>
        <Button
          negative
          onClick={() => handleDelete(id)}
        >
          Delete
        </Button>
      </Header>
      {highlightText(body)}
      <Segment color="blue">
        <User {...user} />
        <CommentList list={comments} />
      </Segment>
    </Segment>
  );
};

const mapStateToProps = state => ({
  postsList: state.postsList,
});

Post.propTypes = {
  id: PropTypes.number.isRequired,
  title: PropTypes.string.isRequired,
  body: PropTypes.string.isRequired,
  handleDelete: PropTypes.func.isRequired,
  user: PropTypes.shape({
    name: PropTypes.string,
    email: PropTypes.string,
    address: PropTypes.object,
  }).isRequired,
  comments: PropTypes.arrayOf(
    PropTypes.object
  ).isRequired,
  searchedText: PropTypes.string.isRequired,
};

export default connect(mapStateToProps, { handleDelete })(Post);
