import React from 'react';

import { useUser } from '@/lib/auth';

const Test = () => {
  const { user } = useUser();
  return <div>{user?.name ?? 'User not found'}</div>;
};

export default Test;
