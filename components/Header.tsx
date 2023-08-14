import Link from 'next/link';
import { signIn, signOut, useSession } from 'next-auth/react'
import { CgProfile } from 'react-icons/cg';
import { BsFillJournalBookmarkFill } from 'react-icons/bs';

function Header() {
  const { status, ...rest} = useSession()

  return (
    <div className="flex flex-row bg-neutral-800  p-4 text-white">
      <div className="w-1/4 md:w-1/3">
        <Link href="/">
          <span className="text-lg md:text-xl font-semibold">
            Home
          </span>
        </Link>
      </div>
      <div className="w-1/4 md:w-1/3">
        <Link href="/reading-list">
          <span className="text-lg md:text-xl font-semibold">
          <BsFillJournalBookmarkFill size ={'30px'} />
          </span>
        </Link>
      </div>
      { status === 'authenticated'  ? ( <div className="w-1/2 md:w-1/3">
        <Link href="/profile">
          <span className="text-lg md:text-xl font-semibold">
            <CgProfile size = {'30px'} />
            {/* Profile */}
          </span>
        </Link>
      </div>) : null}
     
     {(status === 'unauthenticated')||(status === 'loading') ? (<div className="w-1/2 md:w-1/3">
      <Link href='/api/auth/signin'>
              <p className="text-lg md:text-xl font-semibold" onClick={e => {
                e.preventDefault()
                signIn('github')
              }}> Sign In</p> 
              
            </Link>
      </div>): null} 

      { status === 'authenticated' ? ( <div className="w-1/2 md:w-1/3">
      <Link href='/api/auth/signin'>
              <p className="text-lg md:text-xl font-semibold" onClick={e => {
                e.preventDefault()
                signOut({ callbackUrl: 'http://localhost:3000/' })
              }}> Sign Out</p> 
              
            </Link>
      </div>) : null }
     
    </div>
  );
}

export default Header;
