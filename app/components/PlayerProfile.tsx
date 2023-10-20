// File: PlayerProfile.tsx
'use client';
import React, { useEffect, useState } from 'react';
import { createClientComponentClient } from '@supabase/auth-helpers-nextjs';
import { Database } from '../database.types';
import '../globals.css';

type Player = {
  id: number;
  full_name: string;
  position: string;
  height: string;
  weight: number;
  year: string;
  previous_team: string;
  medical_info: any[];
  nutrition: any[];
  practice_data: any[];
};

type PlayerHealthInfoType = {
    medical_notes: string;
    practice_notes: string;
    health_status?: string;  // health_status is now optional
};
  
interface PlayerProfileProps {
      playerId: number;
      initialPlayerHealthInfo: PlayerHealthInfoType | null;
}

export default function PlayerProfile({ playerId, initialPlayerHealthInfo }: PlayerProfileProps) {
    const supabase = createClientComponentClient<Database>();
    const [player, setPlayer] = useState<Player | null>(null);
    const [playerHealthInfo, setPlayerHealthInfo] = useState<PlayerHealthInfoType | null>(initialPlayerHealthInfo);
    const [loading, setLoading] = useState(true);
  

  // Define the fetchData function outside of useEffect
async function fetchData() {
    try {
      setLoading(true);
  
      // Fetch player details
      const playerResponse = await supabase
        .from('players')
        .select('*')
        .eq('id', playerId)
        .single();
      setPlayer(playerResponse.data);
  
      // Fetch player health info
      const healthInfoResponse = await supabase
        .from('player_health_info')
        .select('*')
        .eq('player_id', playerId)
        .single();
      setPlayerHealthInfo(healthInfoResponse.data);
  
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  }
  
  useEffect(() => {
    // Call the fetchData function inside useEffect
    fetchData();
  }, [playerId, supabase]);
  
  async function updateHealthStatus(newStatus: string) {
    try {
      setLoading(true);
  
      const { error } = await supabase
        .from('medical_info')
        .update({ health_status: newStatus })
        .eq('player_id', playerId);
  
      if (error) throw error;
  
      // Call fetchData to refresh the data after updating
      fetchData();
  
    } catch (error) {
      alert('Error updating the data!');
    } finally {
      setLoading(false);
    }
  }
  
  if (loading) {
    return <div>Loading...</div>;
  }
  

  return (
    <div className='below-bar no-banner'>
    <div className="parent-container">
        <section className="main-content-row">
            <div className="left-content">
                <div className="player-image">
                    <img src="/images/cardinal-logo-transparent.png" alt="Player" />
                </div>
                <div className='player-profile'>
                    {player && (
                    <div className='player-details'>
                        <h2>{player.full_name}</h2>
                        <p>Position: {player.position}</p>
                        <p>Year: {player.year}</p>
                    </div>
                    )}
                </div>
            </div>
            <div className="right-content">
                {playerHealthInfo && (
                    <div className='player-health-info'>
                        <div className="health-status">
                            <h3>Status</h3>
                            <div className="entries">
                                <div className="entry">
                                <p>{playerHealthInfo.health_status}</p>
                                </div>
                            </div>
                        </div>
                    </div>
                )}
                <button className="button" onClick={() => {
                    const newStatus = prompt('Enter new health status:');
                    if (newStatus) {
                    updateHealthStatus(newStatus);
                    }
                    }}>Update Health Status
                </button>
            </div>
        </section>
    </div>
    <div className="parent-container">
            <h3>Health Notes</h3>
            <div className="entries">
                <div className="entry">
                    <p>{playerHealthInfo && playerHealthInfo.medical_notes}</p>
                </div>
            </div>
          </div>
          <div className="parent-container">
              <h3>Practice Notes</h3>
              <div className="entries">
                  <div className="entry">
                      <p>{playerHealthInfo && playerHealthInfo.practice_notes}</p>
                  </div>
              </div>
          </div>
    </div>
  );
}
