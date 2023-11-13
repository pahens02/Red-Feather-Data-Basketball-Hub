import NavBar from '../components/NavBar';
import Footer from '../components/Footer';
import { createServerComponentClient } from '@supabase/auth-helpers-nextjs';
import { cookies } from 'next/headers';
import RosterPageClient from '../components/RosterPageClient';

export const dynamic = 'force-dynamic'

type Player = {
  id: number;
  avatar_url: string;
  full_name: string;
  position: string;
  height: string;
  weight: number;
  year: string;
};

type User = {
  id: string;
};


export default async function RosterPage() {
  const supabase = createServerComponentClient({ cookies });

  const { data } = await supabase.from('players').select('*');
  const roster: Player[] = data || []; // If data is null, default to an empty array

  // Fetch the user data
  const {
    data: { user },
  } = await supabase.auth.getUser();

  // Pass data to the page via props, including both players and user
  return (
    <div className='base'>
      <NavBar user={user} />
      <RosterPageClient players={roster} user={user} />
      <Footer />
    </div>
  );
}

