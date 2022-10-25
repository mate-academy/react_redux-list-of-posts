// axios docs https://axios-http.com/docs/intro
import axios from 'axios';

// function wait(delay = 300) {
//   return new Promise(resolve => {
//     setTimeout(resolve, delay);
//   });
// }

const instance = axios.create({
  baseURL: 'https://mate.academy/students-api',
  // application/json is a default Content-Type
});

export const client = {
  async get<T>(url: string) {
    const response = await instance.get<T>(url);

    // await wait();
    // no need to run `response.json()` data is already prepared
    return response.data;
  },

  async post<T>(url: string, data: any) {
    const response = await instance.post<T>(url, data);

    // await wait();

    return response.data;
  },

  async patch<T>(url: string, data: any) {
    const response = await instance.patch<T>(url, data);

    // await wait();

    return response.data;
  },

  async delete(url: string) {
    // if we don't need the response data
    // await wait();

    return instance.delete(url);
  },
};
