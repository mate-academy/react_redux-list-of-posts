import { CommentData } from '../../types/Comment';

function isNullOrWhiteSpace(str: string | null | undefined): boolean {
  return !str || str.trim() === '';
}

export function isValidCommentData(
  data: CommentData | null | undefined,
): boolean {
  if (!data) {
    return false;
  }

  return Object.values(data).every((value) => !isNullOrWhiteSpace(value));
}
