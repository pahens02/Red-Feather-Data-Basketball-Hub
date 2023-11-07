'use client'
// /components/RosterPageClient.tsx
import React, { useState } from 'react';
import NavBar from './NavBar';
import Footer from './Footer';
import Link from 'next/link';

// Include the 'use client' directive here
export const dynamic = 'force-dynamic';

type Player = {
    id: number;
    avatar_url: string;
    full_name: string;
    position: string;
    height: string;
    weight: number;
    year: string;
};
  
type User = {
    id: string;
};

interface RosterPageProps {
  players: Player[];
  user: User | null;
}

export default function RosterPageClient({ players, user }: RosterPageProps ) {
  // Step 1: State Management
  const [searchTerm, setSearchTerm] = useState('');

  // Step 2: Event Handling with TypeScript
  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(event.target.value);
  };

  // Step 3: Filtering Logic
  const filteredPlayers = players?.filter(player => {
    const searchTermLower = searchTerm.toLowerCase();
    const searchTermNumber = parseInt(searchTerm, 10);
  
    // Check for non-numeric fields if they contain the searchTerm
    const matchesTextFields = player.full_name.toLowerCase().includes(searchTermLower) ||
                              player.position.toLowerCase().startsWith(searchTermLower) ||
                              player.year.toLowerCase().includes(searchTermLower);
  
    // Check if the searchTerm is numeric and if it matches the beginning of the weight or height
    const matchesNumericFields = !isNaN(searchTermNumber) && (
      player.weight.toString().startsWith(searchTerm) ||
      player.height.startsWith(searchTerm)
    );
  
    return matchesTextFields || matchesNumericFields;
  });
  
  

  // Step 4: Search Functionality (Optional)
  // You can also implement a function to handle the search submission, which could do more complex searching.
  // For example, it could trigger a new fetch request to the server with the search term as a query parameter.
  // This is just a simple client-side filter example.

  return (
    <div className="below-bar no-banner">
      <div className="parent-container">
        <div className='content-area content-area-2'>
            <div className="search-bar">
                <input 
                  type="text" 
                  placeholder="Search players" 
                  onChange={handleSearchChange} 
                  value={searchTerm} 
                />
                {/* <button className="button" type="submit">Search</button> */}
            </div>
        <h2 className="text-lg font-bold text-center">2023-24 Men&apos;s Basketball Roster</h2>
          <div className="player-cards">
            {/* Player Cards Section */}
            {filteredPlayers?.map((player, index) => (
              <Link href={`/roster/player-health/${player.id}`} key={player.id}>
                <div className="player-card">
                  <img className="player-image" src={player.avatar_url} alt={`${player.full_name}`} />
                  <h2>{player.full_name}</h2>
                  <p>Position: {player.position}</p>
                  <p>Height: {player.height}</p>
                  <p>Weight: {player.weight}</p>
                  <p>Year: {player.year}</p>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </div>
    <Footer />
    </div>
  );
};