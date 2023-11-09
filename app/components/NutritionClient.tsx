'use client'
import React, { useState, useEffect } from 'react';
import Link from 'next/link';

export const dynamic = 'force-dynamic';

  interface NutritionStat {
    id: number;
    full_name: string;
    weight: number;
    mealplan: string;
    approvedfoods: string;
    bodyfatpercentage: number;
    dailyfluidsoz: number;
    additionalsupplements: string;
    recommendedcalories: number;
  }
  
  // Define the type for the prop expected by PlayerNutritionStats component
  interface PlayerNutritionStatsProps {
    nutrition: NutritionStat[];
  }
  
  // Define the type for the sort keys
  type SortKey = keyof NutritionStat;
  
  // Define the type for the sort configuration
  interface SortConfig {
    key: SortKey | null;
    direction: 'ascending' | 'descending';
  }
  
  export default function PlayerNutritionStats({ nutrition }: PlayerNutritionStatsProps) {
    const [stats, setStats] = useState<NutritionStat[]>(nutrition); // Initialize with the prop
    const [sortConfig, setSortConfig] = useState<SortConfig>({ key: 'id', direction: 'ascending' });
  
    useEffect(() => {
      setStats(nutrition); // Update stats when nutrition prop changes
    }, [nutrition]);
  
    const sortData = (key: SortKey) => {
      let direction: 'ascending' | 'descending' = 'ascending';
      if (sortConfig.key === key && sortConfig.direction === 'ascending') {
        direction = 'descending';
      }
      const sortedData = [...stats].sort((a, b) => {
        if (a[key] < b[key]) {
          return direction === 'ascending' ? -1 : 1;
        }
        if (a[key] > b[key]) {
          return direction === 'ascending' ? 1 : -1;
        }
        return 0;
      });
      setStats(sortedData);
      setSortConfig({ key, direction });
    };

    const resetSort = () => {
        setStats(nutrition); // Reset stats to the original nutrition prop
        // Reset sort config to its initial state or any default you prefer
        setSortConfig({ key: 'id', direction: 'ascending' }); 
    };

    const [searchTerm, setSearchTerm] = useState('');

    const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setSearchTerm(event.target.value);
    };

    const sortedAndFilteredStats = stats.sort(/* ...sorting logic... */).filter(stat => {
        const searchTermLower = searchTerm.toLowerCase();
        // Add additional fields you want to search by
        return stat.full_name.toLowerCase().includes(searchTermLower)
          || stat.mealplan.toLowerCase().includes(searchTermLower)
          || stat.approvedfoods.toLowerCase().includes(searchTermLower)
          || stat.additionalsupplements.toLowerCase().includes(searchTermLower)
          || stat.dailyfluidsoz.toString().startsWith(searchTerm)
          || stat.weight.toString().startsWith(searchTerm)
          || stat.recommendedcalories.toString().startsWith(searchTerm);
      });
    

  return (
    <div>
        {/* Player Nutrition Information Section */}
        <h1 className="text-lg font-bold text-center">Player Nutrition Stats</h1>
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
        {/* Headers Section */}
        <div className="grid grid-cols-8 header-cell">
          <div onClick={() => sortData('full_name')}>Full Name</div>
          <div onClick={() => sortData('weight')}>Weight</div>
          <div onClick={() => sortData('mealplan')}>Meal Plan</div>
          <div onClick={() => sortData('approvedfoods')}>Approved Foods</div>
          <div onClick={() => sortData('bodyfatpercentage')}>Body Fat %</div>
          <div onClick={() => sortData('dailyfluidsoz')}>Daily Fluids (oz)</div>
          <div onClick={() => sortData('additionalsupplements')}>Additional Supplements</div>
          <div onClick={() => sortData('recommendedcalories')}>Recommended Calories</div>
        </div>

        {/* Nutrition Data Section */}
        {sortedAndFilteredStats?.map((stat, index) => (
            <div key={index} className="grid grid-cols-8 cell">
                <Link href={`/roster/player-health/${stat.id}`} key={stat.id}>
                  <div className="row">{stat.full_name}</div>
                </Link>
                <div className="row">{stat.weight}</div>
                <div className="row">{stat.mealplan}</div>
                <div className="row">{stat.approvedfoods}</div>
                <div className="row">{stat.bodyfatpercentage}</div>
                <div className="row">{stat.dailyfluidsoz}</div>
                <div className="row">{stat.additionalsupplements}</div>
                <div className="row">{stat.recommendedcalories}</div>
            </div>
        ))}
      </div>
    </div>
  );
};
