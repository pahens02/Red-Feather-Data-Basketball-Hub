import '../../globals.css';
import { createServerComponentClient } from '@supabase/auth-helpers-nextjs';
import { cookies } from 'next/headers';
import NavBar from '../../components/NavBar';
import Footer from '../../components/Footer';
import TeamStatsClient from '../../components/TeamStatsClient';
import Link from 'next/link';

export const dynamic = 'force-dynamic';

// Updated interface to match the structure of the public.game_stats view
interface GameStat {
  game_date: Date;
  total_points: number;
  total_assists: number;
  total_rebounds: number;
  total_steals: number;
  total_blocks: number;
  total_turnovers: number;
  total_minutes: number;
  avg_field_goal_percentage: number;
  avg_three_point_percentage: number;
  avg_free_throw_percentage: number;
}

interface GamePageProps {
  stats: GameStat[];
  user: any; // Replace 'any' with your User type if available
}

const defaultStats: GameStat[] = []; // Default empty array for stats

export default async function TeamPage() {
  const supabase = createServerComponentClient({ cookies });
  
  // Fetch game statistics from the new view
  const { data, error } = await supabase.from("game_stats").select("*");
  const gameStatsData: GameStat[] = data || defaultStats;

  // Check if there was an error fetching the data
  if (error) {
    console.error('Error fetching game stats:', error);
    return null; // or handle the error as you see fit
  }

  // Fetch user data
  const {
    data: { user },
  } = await supabase.auth.getUser()

  return (
    <div className='base'>
      {/* Navigation Bar */}
      <NavBar user={user} />
      {/* Banner Image */}
      <div className='below-bar no-banner'>
        <div className="parent-container-2">
          <div className='content-area content-area-2'>
            {/* Pass the game statistics to the PlayerStatsClient component */}
            <TeamStatsClient gameStats={gameStatsData}/> {/* Updated prop to match expected prop */}
          </div>
        </div>
      </div>
      {/* Footer Section for Quick Access to News and Updates */}
      <Footer />
    </div>
  );
}
