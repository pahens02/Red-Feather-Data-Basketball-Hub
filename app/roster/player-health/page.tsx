'use client'
import { useCallback, useEffect, useState } from 'react'
import Avatar from '../../account/avatar'
import { Database } from '../../database.types'
import { Session, createClientComponentClient } from '@supabase/auth-helpers-nextjs'
import Link from 'next/link'
import NavBar from '../../components/NavBar';
import { useParams } from 'next/navigation'
import PlayerHealthDetails from '../../components/PlayerHealthDetails';  // Import the client component

import { withRouter, NextRouter } from 'next/router';

export const dynamic = 'force-dynamic'

interface Player {
  id: number;
  full_name: string;
  position: string;
  height: string;
  weight: number;
  year: string;
  previous_team: string;
}

interface Props {
  router: NextRouter;
}

const PlayerHealthPage: React.FC<Props> = ({ router }) => {
  const { id } = router.query;

  const [player, setPlayer] = useState<Player | null>(null);

  useEffect(() => {
    if (typeof id === 'string') {
      // Replace with the actual API endpoint to fetch player data
      fetch(`https://zrupegzssdpaczatvqax.supabase.co/rest/v1/players/players?id=eq.${id}`)
        .then(response => response.json())
        .then(data => setPlayer(data))
        .catch(() => setPlayer(null));
    }
  }, [id]);

  return (
    <div className='base'>
        {/* <NavBar user={user} /> */}
        <div className='below-bar no-banner'>
          <div className="parent-container">
            <section className="main-content-row">
              <div className="left-content">
                <div className="player-image">
                  <img src="/images/cardinal-logo-transparent.png" alt="Player" />
                </div>
                  {player ? <PlayerHealthDetails player={player} /> : <div>Player not found</div>}
              </div>
              <div className="right-content">
                <div className="health-status">
                  <h3>Health Status</h3>
                  <div className="entries">
                    <div className="entry">
                      <p>Not-Playing</p>
                    </div>
                  </div>
                </div>
                <button className="button">New Medical Information</button>
              </div>
            </section>
          </div>
          <div className="parent-container">
            <h3>Notes</h3>
            <div className="entries">
                <div className="entry">
                  <p>Wrist injury 10-02-2023</p>
                  <p>Out for 3-4 weeks</p>
                </div>
                <div className="entry">
                  <p>Hamstring injury 9-14-2023</p>
                  <p>Out for 5-6 weeks</p>
                </div>
              </div>
          </div>
        </div>
    </div>
  );
}

