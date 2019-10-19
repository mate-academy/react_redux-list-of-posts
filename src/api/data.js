const BASE_URL = 'https://jsonplaceholder.typicode.com/';

export const getData = async(url) => {
  const response = await fetch(`${BASE_URL}${url}`);

  return response.json();
};
