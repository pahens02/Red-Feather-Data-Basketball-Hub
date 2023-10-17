// Define the interface for the component's props
interface UserProfile {
    id: string;
    full_name?: string;
    username?: string;
    avatar_url?: string;
    updated_at?: string;
  }
  
interface NavBarProps {
    user: UserProfile | null;
}
  
// components/NavBar.tsx
import '../globals.css';
import Link from 'next/link';
import React from 'react';

export const dynamic = 'force-dynamic'


const NavBar: React.FC<NavBarProps> = ({ user }) => {

    return (
    <nav className="navigation">
        <div className='menu'>
          <h2><Link className="hover:text-[var(--custom-color-hover)]" href="#">Schedule</Link></h2>
          <h2><Link className="hover:text-[var(--custom-color-hover)]" href="/roster">Roster</Link></h2>
          <h2><Link className="hover:text-[var(--custom-color-hover)]" href="#">Games</Link></h2>
          <h2><Link className="hover:text-[var(--custom-color-hover)]" href="#">Practice</Link></h2>
          <h2><Link className="hover:text-[var(--custom-color-hover)]" href="#">Analytics</Link></h2>
          <h2><Link className="hover:text-[var(--custom-color-hover)]" href="#">Guidlines</Link></h2>
        </div>
        <div className="user">
        {user ? (
            <div className="text-[var(--btn-foreground)] bg-[var(--btn-background)] hover:bg-[var(--btn-background-hover)] flex items-center space-x-2">
            <Link href="/account">
                <button className="button" type="submit"> 
                {/* Hey, {user.full_name}! */}
                Account
                </button>
            </Link>
            <form action="/auth/signout" method="post">
                <button className="button" type="submit">
                Sign out
                </button>
            </form>
            </div>
        ) : (
            <Link href="/login" className="py-2 px-4 rounded-md no-underline text-[var(--btn-foreground)] bg-[var(--btn-background)] hover:bg-[var(--btn-background-hover)]">
            Login
            </Link>
        )}
        </div>
    </nav>
)
}
export default NavBar;