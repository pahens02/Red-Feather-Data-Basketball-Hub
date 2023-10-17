import '../globals.css';
import { createServerComponentClient } from '@supabase/auth-helpers-nextjs'
import { cookies } from 'next/headers'
import NavBar from '../components/NavBar';
import Link from 'next/link'

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
              <h2 className="text-lg font-bold text-center">2023-24 Men's Basketball Roster</h2>
              <div className="table w-full">
                {/* Headers Section */}
                <div className="grid grid-cols-6 header-cell"> {/* Adjust grid column count */}
                  <div>Full Name</div>
                  <div>Position</div>
                  <div>Height</div>
                  <div>Weight</div>
                  <div>Year</div>
                  <div>Previous Team</div>
                </div>

                {/* Players Data Section */}
                {players?.map((player, index) => (
                  <Link href={`/roster/player-health?id=${player.id}`} key={player.id}>
                  <div className="grid grid-cols-6 cell"> {/* Adjust the key and grid column count */}
                    <div>{player.full_name}</div>
                    <div>{player.position}</div>
                    <div>{player.height}</div>
                    <div>{player.weight}</div>
                    <div>{player.year}</div>
                    <div>{player.previous_team}</div>
                  </div>
                  </Link>
                ))}
              </div>
            </div>
          </div>
        </div>
    </div>
  );
};
