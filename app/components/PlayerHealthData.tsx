'use client'
import '../globals.css';
import { useCallback, useEffect, useState } from 'react'
import { Database } from '../database.types'
import { Session, createClientComponentClient } from '@supabase/auth-helpers-nextjs'
import Link from 'next/link'


interface PlayerHealthDataProps {
  playerId: number;
}

export default function PlayerHealthData({ playerId }: PlayerHealthDataProps) {
  const supabase = createClientComponentClient<Database>()
  const [playerHealthInfo, setPlayerHealthInfo] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchPlayerHealthInfo() {
      try {
        const { data, error } = await supabase
          .from('player_health_info')
          .select('*')
          .eq('player_id', playerId)
          .single();

        if (error) throw error;
        setPlayerHealthInfo(data);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    }

    fetchPlayerHealthInfo();
  }, [playerId]);

  async function updateHealthStatus(newStatus: string) {
    try {
      setLoading(true);

      const { error } = await supabase
        .from('medical_info')
        .update({ health_status: newStatus })
        .eq('player_id', playerId);

    if (error) throw error
        alert('Profile updated!')
    } catch (error) {
        alert('Error updating the data!')
    } finally {
        setLoading(false)
    }
  }

  return {
    playerHealthInfo,
    loading,
    updateHealthStatus,
  };
}
