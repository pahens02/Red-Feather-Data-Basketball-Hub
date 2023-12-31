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

// export const dynamic = 'force-dynamic'


const NavBar: React.FC<NavBarProps> = ({ user }) => {

    return (
    <nav className="navigation">
        <div className='menu'>
            <h2><Link className="hover:text-[var(--custom-color-hover)]" href="/home">Home</Link></h2>
          {/* <h2><Link className="hover:text-[var(--custom-color-hover)]" href="https://outlook.office365.com/owa/calendar/0cf5a7c5a761404493d22ee9140d7602@louisville.edu/232faca8254b40c9804916ac3c6a340c1212094087179253225/calendar.html">Schedule</Link></h2> */}
          <h2><Link className="hover:text-[var(--custom-color-hover)]" href="/roster">Roster</Link></h2>
          <div className="dropdown">
            <h2><Link className="hover:text-[var(--custom-color-hover)]" href="/games">Games</Link></h2>
                <div className="dropdown-content">
                    <Link href="/games/team">Team</Link>
                    <Link href="/games/players">Players</Link>
                </div>
          </div>
          <div className="dropdown">
                <h2><Link className="hover:text-[var(--custom-color-hover)]" href="#">Stats</Link></h2>
                <div className="dropdown-content">
                <Link href="/stats/practice">Practice</Link>
                <Link href="/stats/strength">Strength Training</Link>
                <Link href="/stats/nutrition">Nutrition</Link>
                </div>
          </div>
          <div className="dropdown">
                <h2><Link className="hover:text-[var(--custom-color-hover)]" href="#">Analytics</Link></h2>
                <div className="dropdown-content">
                <Link href="/analytics/practice">Practice</Link>
                <Link href="/analytics/games">Games</Link>
                <Link href="/analytics/players">Player Comparison</Link>
                </div>
          </div>
          <h2><Link className="hover:text-[var(--custom-color-hover)]" href="/Guidelines">Guidelines</Link></h2>
          <div className="dropdown">
                <h2><Link className="hover:text-[var(--custom-color-hover)]" href="#">Links</Link></h2>
                <div className="dropdown-content">
                <Link href="https://sportshub.keemotion.com/">Sportshub</Link>
                <Link href="https://mbball.justplayss.com/admin/">JustPlay</Link>
                <Link href="https://smartabase.com/">Smartbase</Link>
                <Link href="https://darimotion.com/">DARI</Link>
                <Link href="https://www.youtube.com/@gocards">Game Recaps</Link>
                </div>
          </div>
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