/* eslint-disable no-underscore-dangle */
import React from 'react';

import { useUsers } from '@/lib/users/users.hooks';

const Test = () => {
  const { isLoading, data } = useUsers();
  if (isLoading) return <h1>Loading...</h1>;
  return (
    <div>
      {data?.documents.map((user) => (
        <div key={user._id}>{user.name}</div>
      ))}
    </div>
  );
};

export default Test;
