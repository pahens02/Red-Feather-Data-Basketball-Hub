import '../../globals.css';
import { createServerComponentClient } from '@supabase/auth-helpers-nextjs'
import { cookies } from 'next/headers'
import NavBar from '../../components/NavBar';
import Footer from '../../components/Footer';
import PlayerStatsClient from '../../components/PlayerStatsClient'; // Import the new component
import Link from 'next/link'

export const dynamic = 'force-dynamic'

interface PlayerGameStat {
  id: number;
  player_id: number | null;
  full_name: string | null; // Include the full_name field
  game_date: Date;
  points_scored: number | null;
  assists: number | null;
  rebounds: number | null;
  steals: number | null;
  blocks: number | null;
  turnovers: number | null;
  minutes_played: number | null;
  field_goal_percentage: number | null;
  three_point_percentage: number | null;
  free_throw_percentage: number | null;
}

interface GamePageProps {
  stats: PlayerGameStat[];
  user: any; // Replace 'any' with your User type if available
}

const defaultStats: PlayerGameStat[] = []; // Default empty array for stats
const defaultUser: any = {}; // Default empty object for user

export default async function GamePage() {
  const supabase = createServerComponentClient({ cookies })
  
  // Fetch game statistics from the database
  const { data } = await supabase.from("vw_player_game_stats").select("*");
  const gameStatsData: PlayerGameStat[] = data || defaultStats;

  // Fetch user data
  const {
    data: { user },
  } = await supabase.auth.getUser()

  return (
    <div className='base'>
      {/* Navigation Bar */}
      <NavBar user={user} />
      <div className='below-bar no-banner'>
        <div className="parent-container-2">
          <div className='content-area content-area-2'>
            <PlayerStatsClient playerStats={gameStatsData}/>
          </div>
        </div>
      </div>
      {/* Footer Section for Quick Access to News and Updates */}
      <Footer />
    </div>
  )
}
