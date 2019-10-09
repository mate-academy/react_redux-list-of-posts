const SOURCE_URL = 'https://jsonplaceholder.typicode.com/';

const getDataFromServer = data => (
  fetch(`${SOURCE_URL}${data}`).then(resolve => resolve.json())
);

export default getDataFromServer;
