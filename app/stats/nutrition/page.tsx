import '../../globals.css';
import { createServerComponentClient } from '@supabase/auth-helpers-nextjs'
import { cookies } from 'next/headers'
import NavBar from '../../components/NavBar';
import Footer from '../../components/Footer';
import Nutrition from '../../components/NutritionClient';
import Link from 'next/link'

export const dynamic = 'force-dynamic'

interface NutritionStat {
    id: number;
    full_name: string;
    weight: number;
    mealplan: string;
    approvedfoods: string;
    bodyfatpercentage: number;
    dailyfluidsoz: number;
    additionalsupplements: string;
    recommendedcalories: number;
  }
  
interface NutritionPageProps {
    stats: NutritionStat[];
    user: any; // Replace 'any' with your User type if available
}

const defaultStats: NutritionStat[] = []; // Default empty array for stats
const defaultUser: any = {}; // Default empty object for user

export default async function NutritionPage() {
  const supabase = createServerComponentClient({ cookies })
  
  const { data } = await supabase.from("player_nutrition_stats").select();
  const nutritionData: NutritionStat[] = data || defaultStats;


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
                <Nutrition nutrition={nutritionData}/>
            </div>
          </div>
      </div>
      {/* Footer Section for Quick Access to News and Updates */}
      <Footer />
    </div>
  )
}