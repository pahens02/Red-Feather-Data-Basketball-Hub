import '../globals.css';
import { createServerComponentClient } from '@supabase/auth-helpers-nextjs'
import { cookies } from 'next/headers'
import NavBar from '../components/NavBar';
import Footer from '../components/Footer';
import AnalyticsClient from '../components/AnalyticsClient';
import Link from 'next/link'

export const dynamic = 'force-dynamic'

interface AnalyticsPracticeStat {
  practice_id: number;
  player_id: number;
  full_name: string;
  practice_notes: string;
  practice_date: Date;
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
  team_average_points: number | null;
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

const defaultStats: AnalyticsPracticeStat[] = []; // Default empty array for stats

export default async function Analytics() {
  const supabase = createServerComponentClient({ cookies })

  const { data } = await supabase.from("player_practice_details").select("*");
  const practiceData: AnalyticsPracticeStat[] = data || defaultStats;

  const {
    data: { user },
  } = await supabase.auth.getUser()

  return (
    <div className='base'>
        <NavBar user={user} />
        <div className="below-bar no-banner">
          <div className="parent-container">
            <div className="content-area-2">
            <AnalyticsClient analytics={practiceData}/> 
            </div>
        </div>
        </div>
        <Footer />
    </div>
  )
}