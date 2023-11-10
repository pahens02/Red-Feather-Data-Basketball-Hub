import '../globals.css';
import { createServerComponentClient } from '@supabase/auth-helpers-nextjs'
import { cookies } from 'next/headers'
import NavBar from '../components/NavBar';
import Footer from '../components/Footer';
import GameStats from '../components/GameStatsClient'; // Assuming a new component for game stats
import Link from 'next/link'

export const dynamic = 'force-dynamic'

interface BasketballGameStat {
    game_date_time: Date | null;
    home_or_away: string | null;
    opponent_team: string | null;
    location: string | null;
    win: boolean | null;
    score: string | null;
    game_id: number;
}

interface GamePageProps {
    stats: BasketballGameStat[];
    user: any; // Replace 'any' with your User type if available
}

const defaultStats: BasketballGameStat[] = []; // Default empty array for stats
const defaultUser: any = {}; // Default empty object for user

export default async function GamePage() {
  const supabase = createServerComponentClient({ cookies })
  
  // Fetch game statistics from the database
  const { data } = await supabase.from("uofl_mens_basketball_games_processed").select();
  const gameStatsData: BasketballGameStat[] = data || defaultStats;

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
                {/* Pass the game statistics to the GameStats component */}
                <GameStats gameStats={gameStatsData}/>
            </div>
          </div>
      </div>
      {/* Footer Section for Quick Access to News and Updates */}
      <Footer />
    </div>
  )
}
