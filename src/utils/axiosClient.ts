import axios from 'axios';

const instance = axios.create({
  baseURL: 'https://mate.academy/students-api',
});

type FetchData = {

};

export const client = {
  async get<T>(url: string) {
    const response = await instance.get<T>(url);

    // no need to run `response.json()` data is already prepared
    return response.data;
  },

  async post<T>(url: string, data: FetchData) {
    const response = await instance.post<T>(url, data);

    return response.data;
  },

  async patch<T>(url: string, data: any) {
    const response = await instance.patch<T>(url, data);

    return response.data;
  },

  async delete(url: string) {
    return instance.delete(url);
  },
};
