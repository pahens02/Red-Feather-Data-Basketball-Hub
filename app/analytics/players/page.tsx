import '../../globals.css';
import { createServerComponentClient } from '@supabase/auth-helpers-nextjs'
import { cookies } from 'next/headers'
import NavBar from '../../components/NavBar';
import Footer from '../../components/Footer';
import AnalyticsClient from '../../components/PlayerAnalyticsClient';
import Link from 'next/link'

export const dynamic = 'force-dynamic'

interface AnalyticsPlayerStat {
    // Player fields
    player_id: number;
    full_name: string;
    avatar_url: string | null;

    // Practice fields
    practice_id: number | null;
    practice_notes: string | null;
    practice_date: Date | null;
    practice_points_scored: number | null;
    practice_assists: number | null;
    practice_rebounds: number | null;
    practice_steals: number | null;
    practice_blocks: number | null;
    practice_turnovers: number | null;
    practice_minutes_played: number | null;
    practice_field_goal_percentage: number | null;
    practice_three_point_percentage: number | null;
    practice_free_throw_percentage: number | null;

    // Game fields
    game_id: number | null;
    game_date: Date | null;
    game_points_scored: number | null;
    game_assists: number | null;
    game_rebounds: number | null;
    game_steals: number | null;
    game_blocks: number | null;
    game_turnovers: number | null;
    game_minutes_played: number | null;
    game_field_goal_percentage: number | null;
    game_three_point_percentage: number | null;
    game_free_throw_percentage: number | null;
}


const defaultStats: AnalyticsPlayerStat[] = []; // Default empty array for stats

export default async function Analytics() {
    const supabase = createServerComponentClient({ cookies })
  
    // Fetching data from the vw_player_game_stats view
    const { data } = await supabase.from("player_combined_stats").select("*");
    const playerData: AnalyticsPlayerStat[] = data || defaultStats;
  
    const {
      data: { user },
    } = await supabase.auth.getUser()
  
    return (
        <div className='base'>
          <NavBar user={user} />
          <div className="below-bar no-banner">
            <div className="parent-container">
              <div className="content-area-2">
                {/* Pass the fetched data to the AnalyticsClient component */}
                <AnalyticsClient analytics={playerData}/> 
              </div>
            </div>
          </div>
          <Footer />
      </div>
    )
  }