import Router from 'next/router';

import { useUser } from '@/lib/auth/hooks';

export default function LoginButton() {
  const user = useUser();
  if (user) {
    return (
      <>
        Signed in as {user.name} <br />
      </>
    );
  }
  return (
    <>
      Not signed in <br />
      <button onClick={() => Router.push('/signin')}>Sign in</button>
    </>
  );
}
