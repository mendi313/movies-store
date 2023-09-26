// Header.tsx
import { options } from '../api/auth/[...nextauth]/options';
import { getServerSession } from 'next-auth/next';
import Link from 'next/link';

const Header = async () => {
  const session = await getServerSession(options);
  return (
    <div className="w-[70%] mx-auto">
      <ul className="right-0 absolute top-0 bg-slate-700 text-white left-0 p-3 flex items-center justify-center gap-[2rem]">
        <li>
          <Link href="/">Movies</Link>
        </li>
        <li>
          <Link href="/subscriptions">Subscriptions</Link>
        </li>
        {session?.user?.role === 'admin' ? (
          <li>
            <Link href="/userManagment">User Managment</Link>
          </li>
        ) : null}
        {session?.user ? (
          <li>
            <Link href="/api/auth/signout">Log Out</Link>
          </li>
        ) : (
          <li>
            <Link href="/api/auth/signin">Log In</Link>
          </li>
        )}
      </ul>
    </div>
  );
};

export default Header;
