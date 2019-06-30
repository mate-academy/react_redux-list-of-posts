import React from 'react';
import PropTypes from 'prop-types';
import { User } from './User';
import { CommentList } from './CommentList';

export function Post(props) {
  const {
    postItemRemove,
    usersMap,
    comments,
    userId,
    title,
    index,
    body,
    id,
  } = props;
  console.log(usersMap);
  const commentItems = comments.filter(comment => comment.postId === id);
  const user = usersMap[userId];

  return (
    <tr>
      <td>
        <span>{title}</span>
        <p>{body}</p>
        <button
          type="button"
          onClick={() => postItemRemove(index)}
        >
            Remove Post!
        </button>
      </td>
      <td>
        <User user={user} />
      </td>
      <td>
        <CommentList comments={commentItems} />
      </td>
    </tr>
  );
}

Post.propTypes = {
  postItemRemove: PropTypes.func.isRequired,
  comments: PropTypes.arrayOf(PropTypes.object).isRequired,
  userId: PropTypes.number.isRequired,
  title: PropTypes.string.isRequired,
  index: PropTypes.number.isRequired,
  body: PropTypes.string.isRequired,
  id: PropTypes.number.isRequired,
  usersMap: PropTypes.objectOf(PropTypes.shape({
    1: PropTypes.objectOf(PropTypes.shape({
      id: PropTypes.number,
      name: PropTypes.string,
      phone: PropTypes.string,
      username: PropTypes.string,
      website: PropTypes.string,
      company: PropTypes.objectOf(PropTypes.shape({
        bs: PropTypes.string,
        catchPhrase: PropTypes.string,
        name: PropTypes.string,
      })),
      address: PropTypes.objectOf(PropTypes.shape({
        city: PropTypes.string,
        street: PropTypes.string,
        suite: PropTypes.string,
        zipcode: PropTypes.string,
        geo: PropTypes.objectOf({
          lat: PropTypes.string,
          lng: PropTypes.string,
        }),

      })),

    })),
    2: PropTypes.objectOf(PropTypes.shape({
      id: PropTypes.number,
      name: PropTypes.string,
      phone: PropTypes.string,
      username: PropTypes.string,
      website: PropTypes.string,
      company: PropTypes.objectOf(PropTypes.shape({
        bs: PropTypes.string,
        catchPhrase: PropTypes.string,
        name: PropTypes.string,
      })),
      address: PropTypes.objectOf(PropTypes.shape({
        city: PropTypes.string,
        street: PropTypes.string,
        suite: PropTypes.string,
        zipcode: PropTypes.string,
        geo: PropTypes.objectOf({
          lat: PropTypes.string,
          lng: PropTypes.string,
        }),

      })),

    })),
    3: PropTypes.objectOf(PropTypes.shape({
      id: PropTypes.number,
      name: PropTypes.string,
      phone: PropTypes.string,
      username: PropTypes.string,
      website: PropTypes.string,
      company: PropTypes.objectOf(PropTypes.shape({
        bs: PropTypes.string,
        catchPhrase: PropTypes.string,
        name: PropTypes.string,
      })),
      address: PropTypes.objectOf(PropTypes.shape({
        city: PropTypes.string,
        street: PropTypes.string,
        suite: PropTypes.string,
        zipcode: PropTypes.string,
        geo: PropTypes.objectOf({
          lat: PropTypes.string,
          lng: PropTypes.string,
        }),

      })),

    })),
    4: PropTypes.objectOf(PropTypes.shape({
      id: PropTypes.number,
      name: PropTypes.string,
      phone: PropTypes.string,
      username: PropTypes.string,
      website: PropTypes.string,
      company: PropTypes.objectOf(PropTypes.shape({
        bs: PropTypes.string,
        catchPhrase: PropTypes.string,
        name: PropTypes.string,
      })),
      address: PropTypes.objectOf(PropTypes.shape({
        city: PropTypes.string,
        street: PropTypes.string,
        suite: PropTypes.string,
        zipcode: PropTypes.string,
        geo: PropTypes.objectOf({
          lat: PropTypes.string,
          lng: PropTypes.string,
        }),

      })),

    })),
    5: PropTypes.objectOf(PropTypes.shape({
      id: PropTypes.number,
      name: PropTypes.string,
      phone: PropTypes.string,
      username: PropTypes.string,
      website: PropTypes.string,
      company: PropTypes.objectOf(PropTypes.shape({
        bs: PropTypes.string,
        catchPhrase: PropTypes.string,
        name: PropTypes.string,
      })),
      address: PropTypes.objectOf(PropTypes.shape({
        city: PropTypes.string,
        street: PropTypes.string,
        suite: PropTypes.string,
        zipcode: PropTypes.string,
        geo: PropTypes.objectOf({
          lat: PropTypes.string,
          lng: PropTypes.string,
        }),

      })),

    })),
    6: PropTypes.objectOf(PropTypes.shape({
      id: PropTypes.number,
      name: PropTypes.string,
      phone: PropTypes.string,
      username: PropTypes.string,
      website: PropTypes.string,
      company: PropTypes.objectOf(PropTypes.shape({
        bs: PropTypes.string,
        catchPhrase: PropTypes.string,
        name: PropTypes.string,
      })),
      address: PropTypes.objectOf(PropTypes.shape({
        city: PropTypes.string,
        street: PropTypes.string,
        suite: PropTypes.string,
        zipcode: PropTypes.string,
        geo: PropTypes.objectOf({
          lat: PropTypes.string,
          lng: PropTypes.string,
        }),

      })),

    })),
    7: PropTypes.objectOf(PropTypes.shape({
      id: PropTypes.number,
      name: PropTypes.string,
      phone: PropTypes.string,
      username: PropTypes.string,
      website: PropTypes.string,
      company: PropTypes.objectOf(PropTypes.shape({
        bs: PropTypes.string,
        catchPhrase: PropTypes.string,
        name: PropTypes.string,
      })),
      address: PropTypes.objectOf(PropTypes.shape({
        city: PropTypes.string,
        street: PropTypes.string,
        suite: PropTypes.string,
        zipcode: PropTypes.string,
        geo: PropTypes.objectOf({
          lat: PropTypes.string,
          lng: PropTypes.string,
        }),

      })),

    })),
    8: PropTypes.objectOf(PropTypes.shape({
      id: PropTypes.number,
      name: PropTypes.string,
      phone: PropTypes.string,
      username: PropTypes.string,
      website: PropTypes.string,
      company: PropTypes.objectOf(PropTypes.shape({
        bs: PropTypes.string,
        catchPhrase: PropTypes.string,
        name: PropTypes.string,
      })),
      address: PropTypes.objectOf(PropTypes.shape({
        city: PropTypes.string,
        street: PropTypes.string,
        suite: PropTypes.string,
        zipcode: PropTypes.string,
        geo: PropTypes.objectOf({
          lat: PropTypes.string,
          lng: PropTypes.string,
        }),

      })),

    })),
    9: PropTypes.objectOf(PropTypes.shape({
      id: PropTypes.number,
      name: PropTypes.string,
      phone: PropTypes.string,
      username: PropTypes.string,
      website: PropTypes.string,
      company: PropTypes.objectOf(PropTypes.shape({
        bs: PropTypes.string,
        catchPhrase: PropTypes.string,
        name: PropTypes.string,
      })),
      address: PropTypes.objectOf(PropTypes.shape({
        city: PropTypes.string,
        street: PropTypes.string,
        suite: PropTypes.string,
        zipcode: PropTypes.string,
        geo: PropTypes.objectOf({
          lat: PropTypes.string,
          lng: PropTypes.string,
        }),

      })),

    })),
    10: PropTypes.objectOf(PropTypes.shape({
      id: PropTypes.number,
      name: PropTypes.string,
      phone: PropTypes.string,
      username: PropTypes.string,
      website: PropTypes.string,
      company: PropTypes.objectOf(PropTypes.shape({
        bs: PropTypes.string,
        catchPhrase: PropTypes.string,
        name: PropTypes.string,
      })),
      address: PropTypes.objectOf(PropTypes.shape({
        city: PropTypes.string,
        street: PropTypes.string,
        suite: PropTypes.string,
        zipcode: PropTypes.string,
        geo: PropTypes.objectOf({
          lat: PropTypes.string,
          lng: PropTypes.string,
        }),

      })),

    })),
  })).isRequired,
};
