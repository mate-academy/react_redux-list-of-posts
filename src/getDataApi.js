const getDataFromServer = url => (
  fetch(url).then(response => response.json())
);

export default getDataFromServer;
