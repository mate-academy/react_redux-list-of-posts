import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import Button from '@material-ui/core/Button';
import { makeStyles } from '@material-ui/core/styles';
import { loadPosts } from '../actions';
import Post from './post';
import { getPosts } from '../store/posts';
import { getLoading } from '../store/loading';
import { getIsLoaded } from '../store/loaded';

const useStyles = makeStyles(theme => ({
  margin: {
    margin: theme.spacing(1),
  },
  extendedIcon: {
    marginRight: theme.spacing(1),
  },
}));

const PostList = ({ isLoaded, loading, loadingData, posts }) => {
  const loadData = async() => {
    await loadingData();
  };

  const classes = useStyles();

  return (
    <div>
      { isLoaded
        ? (
          <section className="main">
            {posts.map(post => (
              <Post
                key={post.id}
                id={post.id}
                title={post.title}
                body={post.body}
                userName={post.user.name}
                email={post.user.email}
                address={`${post.user.address.city}, 
                ${post.user.address.street}`}
                comments={post.comments}
              />
            ))}
          </section>
        ) : (
          <div className="load">
            { loading ? (
              <>
                <div className="loadingio-spinner-double-ring-9q7pnd89ma7">
                  <div className="ldio-825x8t7zp7o">
                    <div />
                    <div />
                    <div>
                      <div />
                    </div>
                    <div>
                      <div />
                    </div>
                  </div>
                </div>
              </>
            ) : (
              <Button
                variant="outlined"
                color="secondary"
                size="large"
                className={classes.margin}
                onClick={loadData}
              >
                Load
              </Button>

            )}
          </div>
        )}
    </div>
  );
};

const mapStateToProps = state => ({
  posts: getPosts(state.posts),
  isLoaded: getIsLoaded(state.isLoaded),
  loading: getLoading(state.loading),
});

const mapDispatchToProps = {
  loadingData: loadPosts,
};

PostList.propTypes = {
  isLoaded: PropTypes.bool.isRequired,
  loading: PropTypes.bool.isRequired,
  loadingData: PropTypes.func.isRequired,
  posts: PropTypes.arrayOf(PropTypes.shape({
    body: PropTypes.string.isRequired,
    comments: PropTypes.arrayOf(PropTypes.object),
    id: PropTypes.number.isRequired,
    title: PropTypes.string.isRequired,
    user: PropTypes.objectOf(PropTypes.oneOfType([
      PropTypes.string,
      PropTypes.number,
      PropTypes.object,
    ])),
  })),
};

PostList.defaultProps = {
  posts: [],
};

export default connect(mapStateToProps, mapDispatchToProps)(PostList);
