// axios docs https://axios-http.com/docs/intro
import axios, { AxiosResponse } from 'axios';

interface ApiData {
  id: number;
  name: string;
  // описати типи даних для ApiData
}

const instance = axios.create({
  baseURL: 'https://mate.academy/students-api',
  // application/json is a default Content-Type
});

export const client = {
  async get<T>(url: string): Promise<T> {
    const response: AxiosResponse<T> = await instance.get(url);

    // no need to run `response.json()` data is already prepared
    return response.data;
  },

  async post<T>(url: string, data: ApiData): Promise<T> {
    const response: AxiosResponse<T> = await instance.post(url, data);

    return response.data;
  },

  async patch<T>(url: string, data: ApiData): Promise<T> {
    const response: AxiosResponse<T> = await instance.patch(url, data);

    return response.data;
  },

  async delete(url: string): Promise<void> {
    // if we don't need the response data
    await instance.delete(url);
  },
};
