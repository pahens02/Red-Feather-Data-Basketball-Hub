'use client'
import React, { useState, useEffect } from 'react';
import Link from 'next/link';

export const dynamic = 'force-dynamic';

// Interface to match the structure of player_practice_details view
interface PracticeStat {
    practice_id: number;
    player_id: number;
    full_name: string;
    practice_notes: string;
    practice_date: Date;
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

interface PracticeStatsProps {
    practice: PracticeStat[];
}

type SortKey = keyof PracticeStat;

interface SortConfig {
    key: SortKey | null;
    direction: 'ascending' | 'descending';
}

export default function PracticeStats({ practice }: PracticeStatsProps) {
    const [stats, setStats] = useState<PracticeStat[]>(practice);
    const [sortConfig, setSortConfig] = useState<SortConfig>({ key: 'player_id', direction: 'ascending' });

    useEffect(() => {
        setStats(practice);
    }, [practice]);

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
          setStats(practice); // Reset stats to the original nutrition prop
          // Reset sort config to its initial state or any default you prefer
          setSortConfig({ key: 'player_id', direction: 'ascending' }); 
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
        const practiceDateString = stat.practice_date ? new Date(stat.practice_date).toLocaleDateString().toLowerCase() : '';
        // Adjust the fields to match those in your PracticeStat interface
        return stat.full_name.toLowerCase().includes(searchTermLower)
            || stat.practice_notes.toLowerCase().includes(searchTermLower)
            || practiceDateString.includes(searchTermLower)
            || (stat.points_scored !== null && stat.points_scored.toString().includes(searchTermLower))
            || (stat.assists !== null && stat.assists.toString().includes(searchTermLower))
            || (stat.rebounds !== null && stat.rebounds.toString().includes(searchTermLower))
            || (stat.steals !== null && stat.steals.toString().includes(searchTermLower))
            || (stat.blocks !== null && stat.blocks.toString().includes(searchTermLower))
            || (stat.turnovers !== null && stat.turnovers.toString().includes(searchTermLower))
            || (stat.minutes_played !== null && stat.minutes_played.toString().includes(searchTermLower))
            || (stat.field_goal_percentage !== null && stat.field_goal_percentage.toString().includes(searchTermLower))
            || (stat.three_point_percentage !== null && stat.three_point_percentage.toString().includes(searchTermLower))
            || (stat.free_throw_percentage !== null && stat.free_throw_percentage.toString().includes(searchTermLower));
    });

    return (
        <div>
            <h1 className="text-lg font-bold text-center">Player Practice Stats</h1>
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
                        placeholder="Search practices" 
                        onChange={handleSearchChange} 
                        value={searchTerm} 
                        />
                </div>
            <div className="table w-full">
                {/* Headers Section */}
                <div className="grid grid-cols-13 header-cell">
                    <div onClick={() => sortData('full_name')}>Player Name</div>
                    <div onClick={() => sortData('practice_notes')}>Practice Notes</div>
                    <div onClick={() => sortData('points_scored')}>Points Scored</div>
                    <div onClick={() => sortData('assists')}>Assists</div>
                    <div onClick={() => sortData('rebounds')}>Rebounds</div>
                    <div onClick={() => sortData('steals')}>Steals</div>
                    <div onClick={() => sortData('blocks')}>Blocks</div>
                    <div onClick={() => sortData('turnovers')}>Turnovers</div>
                    <div onClick={() => sortData('minutes_played')}>Minutes Played</div>
                    <div onClick={() => sortData('field_goal_percentage')}>FG%</div>
                    <div onClick={() => sortData('three_point_percentage')}>3P%</div>
                    <div onClick={() => sortData('free_throw_percentage')}>FT%</div>
                    <div onClick={() => sortData('practice_date')}>Practice Date</div>
                </div>

                {/* Practice Data Section */}
                {sortedAndFilteredStats?.map((stat, index) => (
                    <div key={index} className="grid grid-cols-13 cell">
                        <Link href={`/roster/player-health/${stat.player_id}`}>
                            <div>{stat.full_name}</div>
                        </Link>
                        <div>{stat.practice_notes}</div>
                        <div>{stat.points_scored}</div>
                        <div>{stat.assists}</div>
                        <div>{stat.rebounds}</div>
                        <div>{stat.steals}</div>
                        <div>{stat.blocks}</div>
                        <div>{stat.turnovers}</div>
                        <div>{stat.minutes_played}</div>
                        <div>{`${stat.field_goal_percentage}%`}</div>
                        <div>{`${stat.three_point_percentage}%`}</div>
                        <div>{`${stat.free_throw_percentage}%`}</div>
                        <div>{stat.practice_date ? new Date(stat.practice_date).toLocaleDateString() : 'N/A'}</div>
                    </div>
                ))}
            </div>
        </div>
    );
}
