const users = () => {
  return [
    {
      id: '1',
      userName: 'Willy',
    },
    {
      id: '2',
      userName: 'Samuel',
    },
    {
      id: '3',
      userName: 'Oliveira',
    },
  ];
};

const user = () => {
  return {
    id: '1',
    userName: 'Willy',
  };
};

export const userResolvers = {
  Query: {
    user,
    users,
  },
};
