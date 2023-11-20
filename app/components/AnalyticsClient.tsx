'use client'
import React, { useState, useEffect } from 'react';
import { createClient } from '@supabase/supabase-js';
import Select, { SingleValue, MultiValue, ActionMeta } from 'react-select';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from 'recharts';

interface AnalyticsPracticeStat {
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
    team_average_points: number | null;
    avg_assists: number | null;
    avg_rebounds: number | null;
    avg_steals: number | null;
    avg_blocks: number | null;
    avg_turnovers: number | null;
    avg_minutes_played: number | null;
    avg_field_goal_percentage: number | null;
    avg_three_point_percentage: number | null;
    avg_free_throw_percentage: number | null;
}

interface PlayerOption {
    value: number;
    label: string;
}

interface StatOption {
    value: keyof AnalyticsPracticeStat;
    label: string;
}

interface AnalyticsStatsProps {
    analytics: AnalyticsPracticeStat[];
}

interface ChartData {
    practice_date: string;
    team_average: number | null;
    playerScores: { [playerName: string]: number | null | undefined };
}

interface PlayerScores {
    [key: string]: number | null | undefined;
}

interface ColorMapping {
    [key: number]: string;
}

export default function PlayerAnalyticsGraph({ analytics }: AnalyticsStatsProps) {
    const [selectedPlayers, setSelectedPlayers] = useState<PlayerOption[]>([]);
    const [combinedData, setCombinedData] = useState<ChartData[]>([]);

    const [selectedStat, setSelectedStat] = useState<string>('points_scored');
    const [selectedTeamStat, setSelectedTeamStat] = useState<string>('team_average_points');

    useEffect(() => {
        const data: ChartData[] = analytics.map(stat => {
            const playerScores: PlayerScores = {};
            selectedPlayers.forEach(player => {
                const statValue = stat[selectedStat as keyof AnalyticsPracticeStat];
                playerScores[player.label] = stat.full_name === player.label 
                    ? (typeof statValue === 'number' ? statValue : null) 
                    : undefined;
            });

            const teamStatValue = stat[selectedTeamStat as keyof AnalyticsPracticeStat];
            return {
                practice_date: new Date(stat.practice_date).toLocaleDateString(),
                team_average: typeof teamStatValue === 'number' ? teamStatValue : null,
                playerScores
            };
        }).filter(stat => selectedPlayers.some(player => stat.playerScores[player.label] !== undefined));

        setCombinedData(data);
    }, [selectedPlayers, selectedStat, selectedTeamStat, analytics]);

    const statOptions = [
        { value: 'points_scored', label: 'Points Scored' },
        { value: 'assists', label: 'Assists' },
        { value: 'rebounds', label: 'Rebounds' },
        { value: 'steals', label: 'Steals' },
        { value: 'blocks', label: 'Blocks' },
        { value: 'turnovers', label: 'Turnovers' },
        { value: 'minutes_played', label: 'Minutes Played' },
        { value: 'field_goal_percentage', label: 'Field Goal Percentage' },
        { value: 'three_point_percentage', label: 'Three Point Percentage' },
        { value: 'free_throw_percentage', label: 'Free Throw Percentage' },
      ];

      const teamStatOptions = [
        { value: 'team_average_points', label: 'Average Points' },
        { value: 'avg_assists', label: 'Average Assists' },
        { value: 'avg_rebounds', label: 'Average Rebounds' },
        { value: 'avg_steals', label: 'Average Steals' },
        { value: 'avg_blocks', label: 'Average Blocks' },
        { value: 'avg_turnovers', label: 'Average Turnovers' },
        { value: 'avg_minutes_played', label: 'Average Minutes Played' },
        { value: 'avg_field_goal_percentage', label: 'Average Field Goal Percentage' },
        { value: 'avg_three_point_percentage', label: 'Average Three Point Percentage' },
        { value: 'avg_free_throw_percentage', label: 'Average Free Throw Percentage' },
      ];

      const handleStatChange = (
        selectedOption: SingleValue<{ value: keyof AnalyticsPracticeStat; label: string; }>,
        actionMeta: ActionMeta<{ value: string; label: string; }>
    ) => {
        if (selectedOption) {
            setSelectedStat(selectedOption.value);
        }
    };
    
    const handleTeamStatChange = (
        selectedOption: SingleValue<{ value: keyof AnalyticsPracticeStat; label: string; }>,
        actionMeta: ActionMeta<{ value: string; label: string; }>
    ) => {
        if (selectedOption) {
            setSelectedTeamStat(selectedOption.value);
        }
    };
    

    const playerOptions = Array.from(new Set(analytics.map(stat => ({
        value: stat.player_id,
        label: stat.full_name
    }))));

    const handleSelectChange = (selectedOptions: MultiValue<PlayerOption>) => {
        setSelectedPlayers(selectedOptions as PlayerOption[]);
    };

    const colorPalette = ['#9C0202', '#588B8B', '#4F345A', '#FFD166', '#011936', '#465362', '#5FBB97', '#8DDCA4', '#218380', '#2A2C24', '#260C1A', '#D58936', '#FF6F59', '#0075A2','#6F8AB7'];

    const playerColorMapping: ColorMapping = selectedPlayers.reduce((acc: ColorMapping, player, index) => {
        acc[player.value] = colorPalette[index % colorPalette.length];
        return acc;
    }, {} as ColorMapping);

    return (
        <div>
            <h1 className="text-lg font-bold text-center">Player Stats Comparison</h1>
            <h3>Player:</h3>
            <Select
                options={playerOptions}
                onChange={handleSelectChange}
                isMulti
            />
            <div className='pb-2'></div>
            <h3>Stat:</h3>
            <Select
                options={statOptions}
                onChange={handleStatChange}
            />
            <div className='pb-2'></div>
            <h3>Team Stat:</h3>
            <Select
                options={teamStatOptions}
                onChange={handleTeamStatChange}
            />
            <div className='pb-2'></div>
            <div className='pb-4'>
                <LineChart width={1500} height={800} data={combinedData}
                    margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="practice_date" />
                    <YAxis />
                    <Tooltip />
                    <Legend />
                    {selectedPlayers.map(player => (
                        <Line
                            key={player.value}
                            type="monotone"
                            dataKey={`playerScores['${player.label}']`}
                            name={player.label}
                            stroke={playerColorMapping[player.value] || '#140000'}
                            activeDot={{ r: 8 }}
                            connectNulls={true}
                        />
                    ))}
                    <Line
                        type="monotone"
                        dataKey="team_average"
                        name="Team Average"
                        stroke="#140000"
                        connectNulls={true}
                    />
                </LineChart>
            </div>
        </div>
    );
}
