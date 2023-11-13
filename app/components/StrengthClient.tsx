'use client'
import React, { useState, useEffect } from 'react';
import Link from 'next/link';

export const dynamic = 'force-dynamic';

interface StrengthStat {
    id: number;
    player_id: number;
    full_name: string; // Player's full name from the players table
    bench_press_reps: number | null;
    conditioning_exercises: string | null;
    recovery_exercises: string | null;
    squat_weight: number | null;
    deadlift_weight: number | null;
    vertical_jump_height: number | null;
    agility_drill_time: number | null;
    force_plate_peak_force: number | null;
    practice_date: Date; // New practice date column
  }
  
interface StrengthPageProps {
    training: StrengthStat[];
}

type SortKey = keyof StrengthStat;

interface SortConfig {
    key: SortKey | null;
    direction: 'ascending' | 'descending';
}


export default function StrengthStats({ training }: StrengthPageProps) {
    const [stats, setStats] = useState<StrengthStat[]>(training);
    const [sortConfig, setSortConfig] = useState<SortConfig>({ key: 'player_id', direction: 'ascending' });
  
    useEffect(() => {
        setStats(stats);
    }, [stats]);

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
          setStats(stats); // Reset stats to the original nutrition prop
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
      
        // Adjust the fields to match those in your StrengthStat interface
        return stat.full_name.toLowerCase().includes(searchTermLower)
            || (stat.bench_press_reps !== null && stat.bench_press_reps.toString().includes(searchTermLower))
            || (stat.conditioning_exercises !== null && stat.conditioning_exercises.toLowerCase().includes(searchTermLower))
            || (stat.recovery_exercises !== null && stat.recovery_exercises.toLowerCase().includes(searchTermLower))
            || (stat.squat_weight !== null && stat.squat_weight.toString().includes(searchTermLower))
            || (stat.deadlift_weight !== null && stat.deadlift_weight.toString().includes(searchTermLower))
            || (stat.vertical_jump_height !== null && stat.vertical_jump_height.toString().includes(searchTermLower))
            || (stat.agility_drill_time !== null && stat.agility_drill_time.toString().includes(searchTermLower))
            || (stat.force_plate_peak_force !== null && stat.force_plate_peak_force.toString().includes(searchTermLower))
            || practiceDateString.includes(searchTermLower);
      });
      

    // Render the table with sortable columns
    return (
      <div>
        <h1 className="text-lg font-bold text-center">Strength Training Stats</h1>
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
                        placeholder="Search players" 
                        onChange={handleSearchChange} 
                        value={searchTerm} 
                        />
        </div>
        <div className="table w-full">
        <div className="grid grid-cols-10 header-cell">
            <div onClick={() => sortData('full_name')}>Player Name</div>
            <div onClick={() => sortData('bench_press_reps')}>Bench Press Reps</div>
            <div onClick={() => sortData('conditioning_exercises')}>Conditioning Exercises</div>
            <div onClick={() => sortData('recovery_exercises')}>Recovery Exercises</div>
            <div onClick={() => sortData('squat_weight')}>Squat Weight</div>
            <div onClick={() => sortData('deadlift_weight')}>Deadlift Weight</div>
            <div onClick={() => sortData('vertical_jump_height')}>Vertical Jump Height</div>
            <div onClick={() => sortData('agility_drill_time')}>Agility Drill Time</div>
            <div onClick={() => sortData('force_plate_peak_force')}>Peak Force</div>
            <div onClick={() => sortData('practice_date')}>Practice Date</div>
        </div>
        {sortedAndFilteredStats.map((stat, index) => (
            <div key={index} className="grid grid-cols-10 cell">
            <Link href={`/roster/player-health/${stat.player_id}`}>
                <div>{stat.full_name}</div>
            </Link>
            <div>{stat.bench_press_reps}</div>
            <div>{stat.conditioning_exercises}</div>
            <div>{stat.recovery_exercises}</div>
            <div>{stat.squat_weight}</div>
            <div>{stat.deadlift_weight}</div>
            <div>{stat.vertical_jump_height}</div>
            <div>{stat.agility_drill_time}</div>
            <div>{stat.force_plate_peak_force}</div>
            <div>{stat.practice_date ? new Date(stat.practice_date).toLocaleDateString() : 'N/A'}</div>
            </div>
        ))}
        </div>
      </div>
    );
  }