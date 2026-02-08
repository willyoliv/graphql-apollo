const posts = () => {
  return [
    {
      id: '1',
      title: 'Post 1',
    },
    {
      id: '2',
      title: 'Post 2',
    },
    {
      id: '3',
      title: 'Post 3',
    },
  ];
};

const post = () => {
  return {
    id: '1',
    title: 'Post 1',
  };
};

export const postResolvers = {
  Query: {
    post,
    posts,
  },
};
