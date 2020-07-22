import { User, Comment } from '../interfaces/interfaces';

export const findAuthor = (userId: number, users: User[]) => {
  const person: User | undefined = users.find(user => user.id === userId);

  if (person) {
    const address = Object.entries(person.address)
      .slice(0, 4)
      .map(option => option.join(' : '))
      .join(', ');

    return [person.name, person.email, address];
  }

  return [];
};

export function findComments(id: number, comments: Comment[]) {
  return comments.filter(comment => comment.postId === id);
}
