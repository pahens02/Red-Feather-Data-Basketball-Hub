// File: PlayerProfile.tsx
'use client';
import React, { useEffect, useState } from 'react';
import { createClientComponentClient } from '@supabase/auth-helpers-nextjs';
import { Database } from '../database.types';
import '../globals.css';

type Player = {
  id: number;
  avatar_url: string;
  full_name: string;
  position: string;
  height: string;
  weight: number;
  year: string;
  previous_school: string;
  hometown_high_school: string;
  medical_info: any[];
  nutrition_info: any[];
  player_practice_info: any[];
};

type PlayerHealthInfoType = {
  medical_notes: string;
  practice_notes: string;
  nutrition_notes: string;
  health_status: string;
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
  
  
  async function updateField(table: string, fieldName: string, newValue: string) {
    try {
      setLoading(true);
  
      const updateData = { [fieldName]: newValue };
      const { error } = await supabase
        .from(table)
        .update(updateData)
        .eq('player_id', playerId);
  
      if (error) throw error;
  
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
                {player ? (
                  <img src={player.avatar_url} alt={`${player.full_name}`} />
                ) : (
                  <div className="images\cardinal-logo-transparent.png">No Image Available</div>
                )}
              </div>
                <div className='player-profile'>
                  {player && (
                    <div className='player-details'>
                      <h2>{player.full_name}</h2>
                      <p>Position: {player.position}</p>
                      <p>Year: {player.year}</p>
                      <p>Height: {player.height}</p>
                      <p>Weight: {player.weight} lbs</p> {/* Assuming weight is in pounds */}
                      {/* <p>Hometown / High School: {player.hometown_high_school}</p> */}
                      <p>Previous Team: {player.previous_school}</p>
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
                    updateField('medical_info', 'health_status', newStatus);
                  }
                }}>Update Health Status</button>
              </div>
          </section>
      </div>
      <div className="parent-container">
        <div className="section-header">
          <h3>Health Notes</h3>
          <button className="button" onClick={() => {
            const newNote = prompt('Enter new health note:');
            if (newNote) {
              updateField('medical_info','medical_notes', newNote);
            }
          }}>Update Health Notes</button>
        </div>
          <div className="entries">
              <div className="entry">
                <p>{playerHealthInfo && playerHealthInfo.medical_notes}</p>
              </div>
          </div>
      </div>
      <div className="parent-container">
        <div className="section-header">
          <h3>Practice Notes</h3>
          <button className="button" onClick={() => {
            const newNote = prompt('Enter new practice note:');
            if (newNote) {
              updateField('player_practice_info','practice_notes', newNote);
            }
          }}>Update Practice Notes</button>
        </div>
          <div className="entries">
              <div className="entry">
                  <p>{playerHealthInfo && playerHealthInfo.practice_notes}</p>
              </div>
          </div>
      </div>
      <div className="parent-container">
        <div className="section-header">
          <h3>Nutrition Notes</h3>
          <button className="button" onClick={() => {
            const newNote = prompt('Enter new nutrition note:');
            if (newNote) {
              updateField('nutrition_info','nutrition_notes', newNote);
            }
          }}>Update Nutrition Notes</button>
        </div>
        <div className="entries">
          <div className="entry">
              <p>{playerHealthInfo && playerHealthInfo.nutrition_notes}</p>
          </div>
      </div>
    </div>
    </div>
  );
}
