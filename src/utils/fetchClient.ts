/* src/utils/fetchClient.ts */
/* eslint-disable @typescript-eslint/no-explicit-any */
const BASE_URL = 'https://mate.academy/students-api';

function wait(delay: number) {
  return new Promise(resolve => setTimeout(resolve, delay));
}

type RequestMethod = 'GET' | 'POST' | 'PATCH' | 'DELETE';

async function parseResponse(response: Response) {
  // trata respostas sem corpo (204, 205) ou 304 Not Modified
  if (
    response.status === 204 ||
    response.status === 205 ||
    response.status === 304
  ) {
    return null;
  }

  const contentType = response.headers.get('content-type') || '';

  if (contentType.includes('application/json')) {
    try {
      return await response.json();
    } catch (err) {
      throw new Error('Invalid JSON response');
    }
  }

  // texto ou outro tipo
  return response.text();
}

async function request<T>(
  url: string,
  method: RequestMethod = 'GET',
  data: any = null,
): Promise<T> {
  const options: RequestInit = { method, headers: {} };

  if (data) {
    options.body = JSON.stringify(data);
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    options.headers = {
      'Content-Type': 'application/json; charset=UTF-8',
    };
  }

  const fullUrl = url.startsWith('http') ? url : BASE_URL + url;

  try {
    await wait(300);
    const res = await fetch(fullUrl, options);

    if (!res.ok) {
      // tenta extrair mensagem do corpo, se houver
      let bodyText: any = null;

      try {
        bodyText = await parseResponse(res);
      } catch {
        /* ignore parse error */
      }

      const msg =
        (bodyText && (bodyText.message || bodyText.error)) ||
        res.statusText ||
        `HTTP ${res.status}`;

      throw new Error(msg);
    }

    const parsed = await parseResponse(res);

    return parsed as T;
  } catch (err: any) {
    // normalize network errors
    throw new Error(err?.message ?? 'Network request failed');
  }
}

export const client = {
  get: <T>(url: string) => request<T>(url),
  post: <T>(url: string, data: any) => request<T>(url, 'POST', data),
  patch: <T>(url: string, data: any) => request<T>(url, 'PATCH', data),
  delete: (url: string) => request(url, 'DELETE'),
};
