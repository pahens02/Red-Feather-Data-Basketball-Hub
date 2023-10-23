import '../globals.css';
import { createServerComponentClient } from '@supabase/auth-helpers-nextjs';
import { cookies } from 'next/headers';
import NavBar from '../components/NavBar';
import Footer from '../components/Footer';
import Link from 'next/link';

export const dynamic = 'force-dynamic';

export default async function RosterPage () {
  const supabase = createServerComponentClient({ cookies });
  const { data: players } = await supabase.from("players").select();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  
  return (
    <div className='base'>
        <NavBar user={user} />
        <div className="below-bar no-banner">
          <div className="parent-container">
            <div className='content-area content-area-2'>
                <div className="search-bar">
                    <input type="text" placeholder="Search players" />
                    <button className="button" type="submit">Search</button>
                </div>
            <h2 className="text-lg font-bold text-center">2023-24 Men&apos;s Basketball Roster</h2>
              <div className="player-cards">
                {/* Player Cards Section */}
                {players?.map((player, index) => (
                  <Link href={`/roster/player-health/${player.id}`} key={player.id}>
                    <div className="player-card">
                      <img className="player-image" src={player.avatar_url} alt={`${player.full_name}`} />
                      <h2>{player.full_name}</h2>
                      <p>Position: {player.position}</p>
                      <p>Height: {player.height}</p>
                      <p>Weight: {player.weight}</p>
                      <p>Year: {player.year}</p>
                      <p>Previous Team: {player.previous_team}</p>
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          </div>
        </div>
        <Footer />
    </div>
  );
};

