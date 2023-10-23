// Header.tsx
import { options } from '../api/auth/[...nextauth]/options';
import { getServerSession } from 'next-auth/next';
import Link from 'next/link';

const Header = async () => {
  const session = await getServerSession(options);
  let displayName = '';

  if (session?.user?.name) {
    // Split the name and get the first part
    const nameParts = session.user.name.split(' ');
    displayName = nameParts[0];
  }

  return (
    <nav className='w-full bg-black fixed top-0 left-0 right-0 z-10'>
      <div className="bg-slate-700 w-full text-white p-3 flex gap-[2rem]">
        {displayName && <p className="left-10 text-white">Hello {displayName}</p>}
        <div className="mx-auto flex gap-[2rem]">
          <div>
            <Link href="/">Movies</Link>
          </div>
          <div>
            <Link href="/subscriptions">Subscriptions</Link>
          </div>
          {session?.user?.role === 'admin' ? (
            <div>
              <Link href="/userManagment">User Managment</Link>
            </div>
          ) : null}
          {session?.user?.role === 'admin' ? (
            <div>
              <Link href="/moviesManagment">Movies Managment</Link>
            </div>
          ) : null}
          {session?.user ? (
            <div>
              <Link href="/api/auth/signout">Log Out</Link>
            </div>
          ) : (
            <div>
              <Link href="/api/auth/signin">Log In</Link>
            </div>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Header;
