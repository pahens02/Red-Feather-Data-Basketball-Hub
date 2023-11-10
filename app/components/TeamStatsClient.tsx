'use client'
import React, { useState, useEffect } from 'react';
import Link from 'next/link';

export const dynamic = 'force-dynamic';

interface GameStat {
    game_date: Date;
    total_points: number;
    total_assists: number;
    total_rebounds: number;
    total_steals: number;
    total_blocks: number;
    total_turnovers: number;
    total_minutes: number;
    avg_field_goal_percentage: number;
    avg_three_point_percentage: number;
    avg_free_throw_percentage: number;
  }
  
  // Update the props interface to use the new GameStat type
  interface GameStatsProps {
    gameStats: GameStat[];
  }
  
  // Update the sort key to reflect the GameStat interface
  type SortKey = keyof GameStat;
  

// Define the type for the sort configuration
interface SortConfig {
  key: SortKey | null;
  direction: 'ascending' | 'descending';
}

export default function GameStatsClient({ gameStats }: GameStatsProps) {
  const [stats, setStats] = useState<GameStat[]>(gameStats);
  const [sortConfig, setSortConfig] = useState<SortConfig>({ key: 'game_date', direction: 'ascending' });

  useEffect(() => {
    setStats(gameStats); // Update stats when gameStats prop changes
  }, [gameStats]);

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
    setStats(gameStats); // Reset stats to the original gameStats prop
    setSortConfig({ key: 'game_date', direction: 'ascending' }); 
  };

  const [searchTerm, setSearchTerm] = useState('');

  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(event.target.value);
  };

  const sortedAndFilteredStats = stats.sort(/* ...sorting logic... */).filter(stat => {
    const searchTermLower = searchTerm.toLowerCase();
    const gameDateString = stat.game_date ? new Date(stat.game_date).toLocaleDateString().toLowerCase() : '';// Converting Date to string for comparison
    return gameDateString.includes(searchTermLower)
      || stat.total_points.toString().toLowerCase().includes(searchTermLower)
      || stat.total_assists.toString().toLowerCase().includes(searchTermLower)
      || stat.total_rebounds.toString().toLowerCase().includes(searchTermLower)
      || stat.total_steals.toString().toLowerCase().includes(searchTermLower)
      || stat.total_blocks.toString().toLowerCase().includes(searchTermLower)
      || stat.total_turnovers.toString().toLowerCase().includes(searchTermLower)
      || stat.total_minutes.toString().toLowerCase().includes(searchTermLower)
      || (stat.avg_field_goal_percentage !== null && (stat.avg_field_goal_percentage * 100).toFixed(1).toLowerCase().includes(searchTermLower))
      || (stat.avg_three_point_percentage !== null && (stat.avg_three_point_percentage * 100).toFixed(1).toLowerCase().includes(searchTermLower))
      || (stat.avg_free_throw_percentage !== null && (stat.avg_free_throw_percentage * 100).toFixed(1).toLowerCase().includes(searchTermLower));
  });
  

  return (
    <div>
        {/* Game Statistics Section */}
        <h1 className="text-lg font-bold text-center">UofL Men&apos;s Basketball Game Stats</h1>
        <div className='pb-4'>
        {/* Reset Button */}
        <button
            onClick={resetSort}
            className="button"
        >
            Reset Sort
        </button>
      </div>
      <div className="search-bar pb-4">
                <input 
                  type="text" 
                  placeholder="Search games" 
                  onChange={handleSearchChange} 
                  value={searchTerm} 
                />
        </div>
      <div className="table w-full">
        {/* Headers Section - Update to match the GameStat fields */}
      <div className="grid grid-cols-11 header-cell">
        <div onClick={() => sortData('game_date')}>Game Date</div>
        <div onClick={() => sortData('total_points')}>Total Points</div>
        <div onClick={() => sortData('total_assists')}>Total Assists</div>
        <div onClick={() => sortData('total_rebounds')}>Total Rebounds</div>
        <div onClick={() => sortData('total_steals')}>Total Steals</div>
        <div onClick={() => sortData('total_blocks')}>Total Blocks</div>
        <div onClick={() => sortData('total_turnovers')}>Total Turnovers</div>
        <div onClick={() => sortData('total_minutes')}>Total Minutes</div>
        <div onClick={() => sortData('avg_field_goal_percentage')}>Avg FG%</div>
        <div onClick={() => sortData('avg_three_point_percentage')}>Avg 3P%</div>
        <div onClick={() => sortData('avg_free_throw_percentage')}>Avg FT%</div>
      </div>

        {/* Game Data Section - Update to match the GameStat fields */}
      {sortedAndFilteredStats?.map((stat, index) => (
        <div key={index} className="grid grid-cols-11 cell">
          <div>{stat.game_date ? new Date(stat.game_date).toLocaleDateString() : 'N/A'}</div>
          <div>{stat.total_points}</div>
          <div>{stat.total_assists}</div>
          <div>{stat.total_rebounds}</div>
          <div>{stat.total_steals}</div>
          <div>{stat.total_blocks}</div>
          <div>{stat.total_turnovers}</div>
          <div>{stat.total_minutes}</div>
          <div>{(stat.avg_field_goal_percentage * 100).toFixed(1) + '%'}</div>
          <div>{(stat.avg_three_point_percentage * 100).toFixed(1) + '%'}</div>
          <div>{(stat.avg_free_throw_percentage * 100).toFixed(1) + '%'}</div>
        </div>
      ))}
      </div>
    </div>
  );
};