// Apply the useClient directive at the top of the file
'use client'

import React from 'react';

// Define your Player type
type Player = {
  id: number;
  full_name: string;
  position: string;
  height: string;
  weight: number;
  year: string;
  previous_team: string;
};

// Define a Client Component for PlayerDetails
function PlayerHealthDetails({ player }: { player: Player | null }) {
    if (!player) {
      return <div>Player not found</div>;
    }
  
    return (
      <div className='player-details'>
        <h2>{player.full_name}</h2>
        <p>Position: {player.position}</p>
        <p>Year: {player.year}</p>
      </div>
    );
  }

export default PlayerHealthDetails;
