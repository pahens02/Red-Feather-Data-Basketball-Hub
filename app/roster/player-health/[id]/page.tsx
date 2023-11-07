import NavBar from '../../../components/NavBar';
import PlayerProfile from '../../../components/PlayerProfile';
import { createServerComponentClient } from '@supabase/auth-helpers-nextjs';
import { cookies } from 'next/headers';
import { useSearchParams } from 'next/navigation';

export const dynamic = 'force-dynamic'

interface Params {
    id: string;
}

export default async function PlayerHealthPage({ params }: { params: Params }) {
  const supabase = createServerComponentClient({ cookies });

  const {
    data: { user },
  } = await supabase.auth.getUser();

  const playerId = Number(params.id);

  if (isNaN(playerId)) {
    console.error('Invalid player ID:', params.id);
    return <div>Invalid player ID</div>;
  }

  const { data: playerHealthInfo, error } = await supabase
    .from('player_health_info')
    .select('*')
    .eq('player_id', playerId)
    .single();

  if (error) {
    console.error(error);
    return <div>Error loading player data</div>; // handle the error appropriately
  }

  return (
    <div className='base'>
      <NavBar user={user} />
        <PlayerProfile 
          playerId={playerId}
          initialPlayerHealthInfo={playerHealthInfo}
        />
    </div>
  );
}


