/* eslint-disable @typescript-eslint/no-explicit-any */
const BASE_URL = 'https://mate.academy/students-api';

// Promise, вирішена після певної затримки
function wait(delay: number) {
  return new Promise(resolve => {
    setTimeout(resolve, delay);
  });
}

// Щоб мати автозаповнення та уникнути помилок
type RequestMethod = 'GET' | 'POST' | 'PATCH' | 'DELETE';

function request<T>(
  url: string,
  method: RequestMethod = 'GET',
  data: any = null, // ми можемо надсилати будь-які дані на сервер
): Promise<T> {
  const options: RequestInit = { method };

  if (data) {
    //Ми додаємо body і Content-Type тільки для запитів з даними
    options.body = JSON.stringify(data);
    options.headers = {
      'Content-Type': 'application/json; charset=UTF-8',
    };
  }

  // для демонстраційних цілей ми емулюємо затримку, щоб побачити, чи працюють завантажувачі
  return wait(300)
    .then(() => fetch(BASE_URL + url, options))
    .then(response => response.json());
}

export const client = {
  get: <T>(url: string) => request<T>(url),
  post: <T>(url: string, data: any) => request<T>(url, 'POST', data),
  patch: <T>(url: string, data: any) => request<T>(url, 'PATCH', data),
  delete: (url: string) => request(url, 'DELETE'),
};
