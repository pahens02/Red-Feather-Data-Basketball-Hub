'use client'
import React, { useState, useEffect } from 'react';
import Link from 'next/link';

export const dynamic = 'force-dynamic';

interface BasketballGameStat {
  game_date_time: Date | null;
  home_or_away: string | null;
  opponent_team: string | null;
  location: string | null;
  win: boolean | null;
  score: string | null;
  game_id: number;
}

// Define the type for the prop expected by the GameStats component
interface GameStatsProps {
  gameStats: BasketballGameStat[];
}

// Define the type for the sort keys
type SortKey = keyof BasketballGameStat;

// Define the type for the sort configuration
interface SortConfig {
  key: SortKey | null;
  direction: 'ascending' | 'descending';
}

export default function GameStats({ gameStats }: GameStatsProps) {
  const [stats, setStats] = useState<BasketballGameStat[]>(gameStats); // Initialize with the prop
  const [sortConfig, setSortConfig] = useState<SortConfig>({ key: 'game_id', direction: 'ascending' });

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
    setSortConfig({ key: 'game_id', direction: 'ascending' }); 
  };

  const [searchTerm, setSearchTerm] = useState('');

  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(event.target.value);
  };

  const sortedAndFilteredStats = stats.sort(/* ...sorting logic... */).filter(stat => {
    const searchTermLower = searchTerm.toLowerCase();
    return stat.opponent_team?.toLowerCase().includes(searchTermLower)
      || stat.location?.toLowerCase().includes(searchTermLower)
      || (stat.score !== null && stat.score.toLowerCase().includes(searchTermLower));
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
        {/* Headers Section */}
        <div className="grid grid-cols-6 header-cell">
          <div onClick={() => sortData('game_date_time')}>Game Date</div>
          <div onClick={() => sortData('home_or_away')}>Home/Away</div>
          <div onClick={() => sortData('opponent_team')}>Opponent</div>
          <div onClick={() => sortData('location')}>Location</div>
          <div onClick={() => sortData('win')}>Win</div>
          <div onClick={() => sortData('score')}>Score</div>
        </div>

        {/* Game Data Section */}
        {sortedAndFilteredStats?.map((game, index) => (
        //   <Link href={`/games/${game.game_id}`} key={game.game_id}>
            <div key={index} className="grid grid-cols-6 cell">
                <div>{game.game_date_time?.toLocaleString()}</div>
                <div>{game.home_or_away}</div>
                <div className="row">{game.opponent_team}</div>
                <div className="row">{game.location}</div>
                <div className="row">{game.win ? 'Win' : 'Loss'}</div>
                <div className="row">{game.score}</div>
            </div>
        //   </Link>
        ))}
      </div>
    </div>
  );
};
