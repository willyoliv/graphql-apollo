export const getPosts = (path = '/') =>
  fetch(process.env.API_URL + '/posts' + path);
