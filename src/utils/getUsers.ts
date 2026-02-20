export const getUsers = (path = '/') =>
  fetch(process.env.API_URL + '/users' + path);
