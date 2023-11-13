import '../../globals.css';
import { createServerComponentClient } from '@supabase/auth-helpers-nextjs'
import { cookies } from 'next/headers'
import NavBar from '../../components/NavBar';
import Footer from '../../components/Footer';
import PracticeClient from '../../components/PracticeClient'; // You might need to update this component or create a new one for displaying practice data
import Link from 'next/link'

export const dynamic = 'force-dynamic'

// New interface for the player practice data
interface PracticeStat {
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
}

interface PracticePageProps {
  stats: PracticeStat[];
  user: any; // Replace 'any' with your User type if available
}

const defaultStats: PracticeStat[] = []; // Default empty array for stats
const defaultUser: any = {}; // Default empty object for user

export default async function PracticePage() {
  const supabase = createServerComponentClient({ cookies })
  
  const { data } = await supabase.from("player_practice_details").select("*");
  const practiceData: PracticeStat[] = data || defaultStats;

  const {
    data: { user },
  } = await supabase.auth.getUser()

  return (
    <div className='base'>
      <NavBar user={user} />
      <div className='below-bar no-banner'>
        <div className="parent-container-2">
          <div className='content-area content-area-3'>
              {/* Update the component to handle the practice data */}
              <PracticeClient practice={practiceData}/> 
          </div>
        </div>
      </div>
      <Footer />
    </div>
  )
}
