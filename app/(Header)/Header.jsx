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
    <nav className="w-full max-[770px]:text-[0.6rem] bg-black fixed top-0 left-0 right-0 z-10">
      <div className="bg-slate-700 w-full text-white p-3 flex max-[770px]:gap-[0.5rem] gap-[2rem]">
        {displayName && <p className="left-10 text-white">Hello {displayName}</p>}
        <div className="mx-auto flex max-[770px]:gap-[1rem] gap-[2rem]">
          <div>
            <Link href="/">Movies</Link>
          </div>
          <div>
            <Link href="/subscriptions">Subscriptions</Link>
          </div>
          {session?.user?.role === 'superAdmin' ? (
            <div>
              <Link href="/userManagment">User Managment</Link>
            </div>
          ) : null}
          {session?.user?.role === 'admin' || session?.user?.role === 'superAdmin' ? (
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
      {!session?.user?.role ? (
        <div className="bg-slate-300 p-2">
          <h2 className=" text-red-400 text-lg font-medium text-center">logIn as fake admin. email: fake@gmail.com, password: 123456</h2>
        </div>
      ) : null}
    </nav>
  );
};

export default Header;
