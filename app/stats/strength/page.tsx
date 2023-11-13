import '../../globals.css';
import { createServerComponentClient } from '@supabase/auth-helpers-nextjs';
import { cookies } from 'next/headers';
import NavBar from '../../components/NavBar';
import Footer from '../../components/Footer';
import StrengthClient from '../../components/StrengthClient'; // Assuming a new component for practice stats
import Link from 'next/link';

export const dynamic = 'force-dynamic';

// New interface for the practice stats to include the player's full name and practice date
interface StrengthStat {
  id: number;
  player_id: number;
  full_name: string; // Player's full name from the players table
  bench_press_reps: number | null;
  conditioning_exercises: string | null;
  recovery_exercises: string | null;
  squat_weight: number | null;
  deadlift_weight: number | null;
  vertical_jump_height: number | null;
  agility_drill_time: number | null;
  force_plate_peak_force: number | null;
  practice_date: Date; // New practice date column
}

interface StrengthPageProps {
  training: StrengthStat[];
  user: any; // Replace 'any' with your User type if available
}

const defaultStats: StrengthStat[] = []; // Default empty array for stats
const defaultUser: any = {}; // Default empty object for user

export default async function PracticePage() {
  const supabase = createServerComponentClient({ cookies });

  // Fetch data from the new view
  const { data } = await supabase.from("strength_training_details").select("*");
  const trainingData: StrengthStat[] = data || defaultStats;

  const {
    data: { user },
  } = await supabase.auth.getUser();

  return (
    <div className='base'>
      {/* Navigation Bar */}
      <NavBar user={user} />
      {/* Main content area */}
      <div className='below-bar no-banner'>
        <div className="parent-container-2">
          <div className='content-area content-area-3'>
            {/* Pass the practice statistics to the PracticeStats component */}
            <StrengthClient training={trainingData}/>
          </div>
        </div>
      </div>
      {/* Footer Section */}
      <Footer />
    </div>
  );
};
