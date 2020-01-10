import React, { useState } from 'react';
import debounce from 'lodash/debounce';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import Button from '@material-ui/core/Button';
import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import { loadPosts, changeQuery } from '../actions';
import Post from './post';
import { getPosts } from '../store/posts';
import { getLoading } from '../store/loading';
import { getIsLoaded } from '../store/loaded';
import { getValue } from '../store/inputValue';

const useStyles = makeStyles(theme => ({
  margin: {
    margin: theme.spacing(1),
  },
  extendedIcon: {
    marginRight: theme.spacing(1),
  },
  root: {
    '& > *': {
      width: 200,
    },
  },
}));

const PostList
  = ({ isLoaded, loading, loadingData, posts, setQuery, query }) => {
    const [inputQuery, setInputQuery] = useState('');
    const loadData = async() => {
      await loadingData();
    };
    const debouncedSetQuery = debounce(setQuery, 1000);

    const handleChangeQuery = (evt) => {
      debouncedSetQuery(evt.target.value);
      setInputQuery(evt.target.value);
    };

    const postsAfterQuery = !query
      ? posts
      : posts.filter(item => item.body.toLowerCase()
        .includes(query.toLowerCase())
      || item.title.toLowerCase()
        .includes(query.toLowerCase()));

    const classes = useStyles();

    return (
      <div>
        { isLoaded
          ? (
            <>
              <TextField
                style={{ margin: 40 }}
                id="outlined-basic"
                label="Query"
                variant="outlined"
                type="text"
                value={inputQuery}
                onChange={handleChangeQuery}
              />

              <section className="main">
                {postsAfterQuery.map(post => (
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

              </>
          ) : (
            <div className="load">
              { loading ? (
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
              ) : (
                <>
                  <Button
                    variant="outlined"
                    color="secondary"
                    size="large"
                    className={classes.margin}
                    onClick={loadData}
                  >
                Load
                  </Button>
                </>
              )}
            </div>
          )}
      </div>
    );
  };

const mapStateToProps = state => ({
  posts: getPosts(state),
  isLoaded: getIsLoaded(state),
  loading: getLoading(state),
  query: getValue(state),
});

const mapDispatchToProps = ({
  loadingData: loadPosts,
  setQuery: changeQuery,
});

PostList.propTypes = {
  isLoaded: PropTypes.bool.isRequired,
  loading: PropTypes.bool.isRequired,
  loadingData: PropTypes.func.isRequired,
  setQuery: PropTypes.func.isRequired,
  query: PropTypes.string.isRequired,
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
