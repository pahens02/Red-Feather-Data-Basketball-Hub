'use client'
import React, { useState, useEffect } from 'react';
import Link from 'next/link';

export const dynamic = 'force-dynamic';

interface PlayerGameStat {
  id: number;
  player_id: number | null;
  full_name: string | null; // Include the full_name field
  game_date: Date;
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

// Define the type for the prop expected by the PlayerStatsClient component
interface PlayerStatsProps {
  playerStats: PlayerGameStat[];
}

// Define the type for the sort keys
type SortKey = keyof PlayerGameStat;

// Define the type for the sort configuration
interface SortConfig {
  key: SortKey | null;
  direction: 'ascending' | 'descending';
}

export default function PlayerStatsClient({ playerStats }: PlayerStatsProps) {
  const [stats, setStats] = useState<PlayerGameStat[]>(playerStats); // Initialize with the prop
  const [sortConfig, setSortConfig] = useState<SortConfig>({ key: 'id', direction: 'ascending' });

  useEffect(() => {
    setStats(playerStats); // Update stats when playerStats prop changes
  }, [playerStats]);

  const sortData = (key: SortKey) => {
    let direction: 'ascending' | 'descending' = 'ascending';
    if (sortConfig.key === key && sortConfig.direction === 'ascending') {
      direction = 'descending';
    }
    const sortedData = [...stats].sort((a, b) => {
        const aValue = a[key];
        const bValue = b[key];
      
        if (aValue === null) return direction === 'ascending' ? -1 : 1;
        if (bValue === null) return direction === 'ascending' ? 1 : -1;
        if (aValue === bValue) return 0;
      
        return aValue < bValue
          ? direction === 'ascending' ? -1 : 1
          : direction === 'ascending' ? 1 : -1;
    });
    setStats(sortedData);
    setSortConfig({ key, direction });
  };

  const resetSort = () => {
    setStats(playerStats); // Reset stats to the original playerStats prop
    setSortConfig({ key: 'id', direction: 'ascending' }); 
  };

  const [searchTerm, setSearchTerm] = useState('');

  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(event.target.value);
  };

  const sortedAndFilteredStats = stats
  .sort((a, b) => {
    if (sortConfig.key) {
      const aValue = a[sortConfig.key] || '';
      const bValue = b[sortConfig.key] || '';

      if (aValue < bValue) {
        return sortConfig.direction === 'ascending' ? -1 : 1;
      }
      if (aValue > bValue) {
        return sortConfig.direction === 'ascending' ? 1 : -1;
      }
    }
    return 0;
  })
  .filter(stat => {
    const searchTermLower = searchTerm.toLowerCase();
    const gameDateString = stat.game_date ? new Date(stat.game_date).toLocaleDateString().toLowerCase() : '';

    // Check if the search term is included in any of the stringified stat properties
    return (
    stat.full_name?.toLowerCase().includes(searchTermLower) ||
      gameDateString.includes(searchTermLower) ||
      stat.points_scored?.toString().includes(searchTermLower) ||
      stat.assists?.toString().includes(searchTermLower) ||
      stat.rebounds?.toString().includes(searchTermLower) ||
      stat.steals?.toString().includes(searchTermLower) ||
      stat.blocks?.toString().includes(searchTermLower) ||
      stat.turnovers?.toString().includes(searchTermLower) ||
      stat.minutes_played?.toString().includes(searchTermLower) ||
      (stat.field_goal_percentage !== null && (stat.field_goal_percentage * 100).toFixed(1).includes(searchTermLower)) ||
      (stat.three_point_percentage !== null && (stat.three_point_percentage * 100).toFixed(1).includes(searchTermLower)) ||
      (stat.free_throw_percentage !== null && (stat.free_throw_percentage * 100).toFixed(1).includes(searchTermLower))
    );
  });

  return (
    <div>
      {/* Player Game Statistics Section */}
      <h1 className="text-lg font-bold text-center">Player Game Stats</h1>
      <div className='pb-4'>
        {/* Reset Button */}
        <button onClick={resetSort} className="button">
          Reset Sort
        </button>
      </div>
      <div className="search-bar pb-4">
        <input 
          type="text" 
          placeholder="Search stats" 
          onChange={handleSearchChange} 
          value={searchTerm} 
        />
      </div>
      <div className="table w-full">
        {/* Headers Section */}
        <div className="grid grid-cols-12 header-cell">
          <div onClick={() => sortData('full_name')}>Full Name</div>
          <div onClick={() => sortData('points_scored')}>Points</div>
          <div onClick={() => sortData('assists')}>Assists</div>
          <div onClick={() => sortData('rebounds')}>Rebounds</div>
          <div onClick={() => sortData('steals')}>Steals</div>
          <div onClick={() => sortData('blocks')}>Blocks</div>
          <div onClick={() => sortData('turnovers')}>Turnovers</div>
          <div onClick={() => sortData('minutes_played')}>Minutes Played</div>
          <div onClick={() => sortData('field_goal_percentage')}>FG%</div>
          <div onClick={() => sortData('three_point_percentage')}>3P%</div>
          <div onClick={() => sortData('free_throw_percentage')}>FT%</div>
          <div onClick={() => sortData('game_date')}>Game Date</div>
        </div>

        {/* Game Data Section */}
        {sortedAndFilteredStats?.map((stat, index) => (
          <div key={index} className="grid grid-cols-12 cell">
            {/* Convert game_date to a Date object before calling toLocaleDateString */}
            <Link href={`/roster/player-health/${stat.player_id}`} key={stat.player_id}>
                <div>{stat.full_name}</div>
            </Link>
            <div>{stat.points_scored}</div>
            <div>{stat.assists}</div>
            <div>{stat.rebounds}</div>
            <div>{stat.steals}</div>
            <div>{stat.blocks}</div>
            <div>{stat.turnovers}</div>
            <div>{stat.minutes_played}</div>
            <div>{stat.field_goal_percentage !== null ? (stat.field_goal_percentage * 100).toFixed(1) + '%' : 'N/A'}</div>
            <div>{stat.three_point_percentage !== null ? (stat.three_point_percentage * 100).toFixed(1) + '%' : 'N/A'}</div>
            <div>{stat.free_throw_percentage !== null ? (stat.free_throw_percentage * 100).toFixed(1) + '%' : 'N/A'}</div>
            <div>{stat.game_date ? new Date(stat.game_date).toLocaleDateString() : 'N/A'}</div>
          </div>
        ))}
      </div>
  </div>
  );
};
