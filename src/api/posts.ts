// src/api/posts.ts
import { Post } from '../types/Post';

/**
 * Normaliza respostas de diferentes clientes:
 * - Se o cliente (ex.: axios) retornar { data, status }, usamos data.
 * - Se o cliente retornar o body direto (fetch wrapper), usamos o valor retornado.
 * - Lança erro com mensagem clara em caso de falha.
 */
async function normalizeResponse<T>(res: unknown): Promise<T> {
  // checa se é um objeto não-nulo
  if (res !== null && typeof res === 'object') {
    const obj = res as Record<string, unknown>;

    // axios-like response: tem chave data
    if ('data' in obj) {
      // se tiver status e for número, valide erro
      if (
        'status' in obj &&
        typeof obj.status === 'number' &&
        obj.status >= 400
      ) {
        const data = obj.data as Record<string, unknown> | undefined;
        const msg =
          (data && typeof data.message === 'string' && data.message) ||
          (typeof obj.statusText === 'string' && obj.statusText) ||
          `HTTP ${obj.status}`;

        throw new Error(msg);
      }

      return obj.data as T;
    }
  }

  // fetch-like wrapper ou body direto
  return res as T;
}

function ensureArray<T>(value: unknown): T[] {
  if (value === null || value === undefined) {
    return [];
  }

  if (Array.isArray(value)) {
    return value as T[];
  }

  throw new Error('API returned unexpected shape for posts (expected array)');
}

function getErrorMessage(
  err: unknown,
  fallback = 'Failed to fetch posts',
): string {
  if (err instanceof Error) {
    return err.message;
  }

  if (typeof err === 'string') {
    return err;
  }

  try {
    return JSON.stringify(err) || fallback;
  } catch {
    return fallback;
  }
}

export async function getPosts(): Promise<Post[]> {
  try {
    const { client } = await import('../utils/fetchClient');
    const res = await client.get('/posts');
    const data = await normalizeResponse<unknown>(res);

    return ensureArray<Post>(data);
  } catch (err: unknown) {
    throw new Error(getErrorMessage(err, 'Failed to fetch posts'));
  }
}

export async function getUserPosts(userId: number): Promise<Post[]> {
  if (typeof userId !== 'number' || Number.isNaN(userId)) {
    throw new Error('Invalid userId');
  }

  try {
    const { client } = await import('../utils/fetchClient');
    const res = await client.get(
      `/posts?userId=${encodeURIComponent(String(userId))}`,
    );
    const data = await normalizeResponse<unknown>(res);

    return ensureArray<Post>(data);
  } catch (err: unknown) {
    throw new Error(getErrorMessage(err, 'Failed to fetch user posts'));
  }
}

export default {
  getPosts,
  getUserPosts,
};
