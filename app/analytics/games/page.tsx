import '../../globals.css';
import { createServerComponentClient } from '@supabase/auth-helpers-nextjs'
import { cookies } from 'next/headers'
import NavBar from '../../components/NavBar';
import Footer from '../../components/Footer';
import AnalyticsClient from '../../components/GameAnalyticsClient';
import Link from 'next/link'

export const dynamic = 'force-dynamic'

interface AnalyticsGameStat {
    id: number;
    player_id: number;
    full_name: string;
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
    avg_points_scored: number | null;
    avg_assists: number | null;
    avg_rebounds: number | null;
    avg_steals: number | null;
    avg_blocks: number | null;
    avg_turnovers: number | null;
    avg_minutes_played: number | null;
    avg_field_goal_percentage: number | null;
    avg_three_point_percentage: number | null;
    avg_free_throw_percentage: number | null;
}


const defaultStats: AnalyticsGameStat[] = []; // Default empty array for stats

export default async function Analytics() {
    const supabase = createServerComponentClient({ cookies })
  
    // Fetching data from the vw_player_game_stats view
    const { data } = await supabase.from("vw_player_game_stats_with_averages").select("*");
    const gameData: AnalyticsGameStat[] = data || defaultStats;
  
    const {
      data: { user },
    } = await supabase.auth.getUser()
  
    return (
      <div className='base'>
          <NavBar user={user} />
          <div className="below-bar no-banner">
            <div className="parent-container">
              <div className="content-area-2">
                {/* Pass the fetched game data to the AnalyticsClient component */}
                <AnalyticsClient analytics={gameData}/> 
              </div>
            </div>
          </div>
          <Footer />
      </div>
    )
  }
  