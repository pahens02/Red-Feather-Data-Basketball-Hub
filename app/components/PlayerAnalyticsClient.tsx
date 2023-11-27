'use client'
import React, { useState, useEffect } from 'react';
import { createClient } from '@supabase/supabase-js';
import Select, { SingleValue, MultiValue, ActionMeta } from 'react-select';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from 'recharts';
import { ResponsiveContainer } from 'recharts';


interface AnalyticsPlayerStat {
    // Player fields
    player_id: number;
    full_name: string;
    avatar_url: string | null;

    // Practice fields
    practice_id: number | null;
    practice_notes: string | null;
    practice_date: Date | null;
    practice_points_scored: number | null;
    practice_assists: number | null;
    practice_rebounds: number | null;
    practice_steals: number | null;
    practice_blocks: number | null;
    practice_turnovers: number | null;
    practice_minutes_played: number | null;
    practice_field_goal_percentage: number | null;
    practice_three_point_percentage: number | null;
    practice_free_throw_percentage: number | null;

    // Game fields
    game_id: number | null;
    game_date: Date | null;
    game_points_scored: number | null;
    game_assists: number | null;
    game_rebounds: number | null;
    game_steals: number | null;
    game_blocks: number | null;
    game_turnovers: number | null;
    game_minutes_played: number | null;
    game_field_goal_percentage: number | null;
    game_three_point_percentage: number | null;
    game_free_throw_percentage: number | null;
}



interface PlayerOption {
    value: number;
    label: string;
}

interface StatOption {
    value: keyof AnalyticsPlayerStat;
    label: string;
}

interface AnalyticsStatsProps {
    analytics: AnalyticsPlayerStat[];
}

interface ChartData {
    date: string;
    playerScores: { [playerName: string]: number | null | undefined };
}

interface PlayerScores {
    [key: string]: number | null | undefined;
}

interface ColorMapping {
    [key: string]: string;
}

export default function PlayerAnalyticsGraph({ analytics }: AnalyticsStatsProps) {
// State for player selections
const [playerOne, setPlayerOne] = useState<PlayerOption | null>(null);
const [playerTwo, setPlayerTwo] = useState<PlayerOption | null>(null);

// State for stat selections
const [statForPlayerOne, setStatForPlayerOne] = useState<string>('points_scored');
const [statForPlayerTwo, setStatForPlayerTwo] = useState<string>('points_scored');

// Combined data state
const [combinedData, setCombinedData] = useState<ChartData[]>([]);

// Unique player options state
const [uniquePlayerOptions, setUniquePlayerOptions] = useState<PlayerOption[]>([]);

useEffect(() => {
    // Generate unique player options
    const generatedPlayerOptions = Array.from(new Set(analytics.map(stat => stat.player_id)))
        .map(player_id => {
            const player = analytics.find(stat => stat.player_id === player_id);
            return { value: player_id, label: player ? player.full_name : 'Unknown Player' };
        });
    setUniquePlayerOptions(generatedPlayerOptions);

    // Create a combined data structure
    let combinedDataMap = new Map();

    analytics.forEach(stat => {
        const date = stat.game_date ? new Date(stat.game_date).toLocaleDateString() 
                                    : (stat.practice_date ? new Date(stat.practice_date).toLocaleDateString() : 'Unknown Date');

        if (!combinedDataMap.has(date)) {
            combinedDataMap.set(date, { date, playerScores: {} });
        }

        let entry = combinedDataMap.get(date);

        // Update for Player One
        if (playerOne && stat.player_id === playerOne.value) {
            const playerOneLabel = `${playerOne.label} (${statForPlayerOne})`;
            entry.playerScores[playerOneLabel] = stat[statForPlayerOne as keyof AnalyticsPlayerStat] || null;
        }

        // Update for Player Two
        if (playerTwo && stat.player_id === playerTwo.value) {
            const playerTwoLabel = `${playerTwo.label} (${statForPlayerTwo})`;
            entry.playerScores[playerTwoLabel] = stat[statForPlayerTwo as keyof AnalyticsPlayerStat] || null;
        }
    });

    setCombinedData(Array.from(combinedDataMap.values()));
}, [analytics, playerOne, playerTwo, statForPlayerOne, statForPlayerTwo]);




    const statOptions = [
        { value: 'practice_points_scored', label: 'Practice Points Scored' },
        { value: 'practice_assists', label: 'Practice Assists' },
        { value: 'practice_rebounds', label: 'Practice Rebounds' },
        { value: 'practice_steals', label: 'Practice Steals' },
        { value: 'practice_blocks', label: 'Practice Blocks' },
        { value: 'practice_turnovers', label: 'Practice Turnovers' },
        { value: 'practice_minutes_played', label: 'Practice Minutes Played' },
        { value: 'practice_field_goal_percentage', label: 'Practice Field Goal Percentage' },
        { value: 'practice_three_point_percentage', label: 'Practice Three Point Percentage' },
        { value: 'practice_free_throw_percentage', label: 'Practice Free Throw Percentage' },
        { value: 'game_points_scored', label: 'Game Points Scored' },
        { value: 'game_assists', label: 'Game Assists' },
        { value: 'game_rebounds', label: 'Game Rebounds' },
        { value: 'game_steals', label: 'Game Steals' },
        { value: 'game_blocks', label: 'Game Blocks' },
        { value: 'game_turnovers', label: 'Game Turnovers' },
        { value: 'game_minutes_played', label: 'Game Minutes Played' },
        { value: 'game_field_goal_percentage', label: 'Game Field Goal Percentage' },
        { value: 'game_three_point_percentage', label: 'Game Three Point Percentage' },
        { value: 'game_free_throw_percentage', label: 'Game Free Throw Percentage' },
    ];
      

    const handlePlayerOneSelectChange = (selectedOption: SingleValue<PlayerOption>) => {
        setPlayerOne(selectedOption);
    };
    
    const handlePlayerTwoSelectChange = (selectedOption: SingleValue<PlayerOption>) => {
        setPlayerTwo(selectedOption);
    };
    
    // Handlers for Stat Selection
    const handleStatOneSelectChange = (selectedOption: SingleValue<{ value: string; label: string; }>) => {
        if (selectedOption) {
            setStatForPlayerOne(selectedOption.value);
        }
    };
    
    const handleStatTwoSelectChange = (selectedOption: SingleValue<{ value: string; label: string; }>) => {
        if (selectedOption) {
            setStatForPlayerTwo(selectedOption.value);
        }
    };

    const playerOptions = Array.from(new Set(analytics.map(stat => ({
        value: stat.player_id,
        label: stat.full_name
    }))));
    
    const lineColors = ['#9C0202', '#588B8B']; // Two distinct colors for the two lines

    const playerColorMapping: ColorMapping = {};
    if (playerOne) {
        playerColorMapping[`${playerOne.label} (${statForPlayerOne})`] = lineColors[0];
    }
    if (playerTwo) {
        playerColorMapping[`${playerTwo.label} (${statForPlayerTwo})`] = lineColors[1];
    }

    

    return (
        <div>
            <h1 className="text-lg font-bold text-center">Player Stats Comparison</h1>
    
            {/* Player 1 Selection */}
            <h3>Player 1:</h3>
            <Select
                options={uniquePlayerOptions}
                onChange={handlePlayerOneSelectChange}
            />
            <h3>Player 1 Stat:</h3>
            <Select
                options={statOptions}
                onChange={handleStatOneSelectChange}
            />
    
            {/* Player 2 Selection */}
            <h3>Player 2:</h3>
            <Select
                options={uniquePlayerOptions}
                onChange={handlePlayerTwoSelectChange}
            />
            <h3>Player 2 Stat:</h3>
            <Select
                options={statOptions}
                onChange={handleStatTwoSelectChange}
            />
            <div className='pb-2'></div>
            <div className='pb-4'>
            <ResponsiveContainer width="100%" height={800}>
                <LineChart data={combinedData}
                    margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="date" />
                    <YAxis />
                    <Tooltip />
                    <Legend />
                    {playerOne && (
                        <Line
                            key={`player-${playerOne.value}-stat-${statForPlayerOne}`}
                            type="monotone"
                            dataKey={`playerScores['${playerOne.label} (${statForPlayerOne})']`}
                            name={`${playerOne.label} (${statForPlayerOne})`}
                            stroke={playerColorMapping[`${playerOne.label} (${statForPlayerOne})`]}
                            activeDot={{ r: 8 }}
                            connectNulls={true}
                        />
                    )}
                    {playerTwo && (
                        <Line
                            key={`player-${playerTwo.value}-stat-${statForPlayerTwo}`}
                            type="monotone"
                            dataKey={`playerScores['${playerTwo.label} (${statForPlayerTwo})']`}
                            name={`${playerTwo.label} (${statForPlayerTwo})`}
                            stroke={playerColorMapping[`${playerTwo.label} (${statForPlayerTwo})`]}
                            activeDot={{ r: 8 }}
                            connectNulls={true}
                        />
                    )}
                </LineChart>
            </ResponsiveContainer>
            </div>
        </div>
    );
    
}
