import React from 'react';
import { createServerComponentClient } from '@supabase/auth-helpers-nextjs'
import { cookies } from 'next/headers'
import NavBar from '../../components/NavBar';

export const dynamic = 'force-dynamic'

const workoutSchedule = {
  strengthTraining: [
    { day: 'Monday', exercises: ['Bench: 3x10', 'Squat: 4x12', 'Deadlift: 5x8', 'Powerclean: 3x10'] },
    // ... other days
  ],
  conditioning: [
    { day: 'Monday', exercises: ['40 Yard Dash', 'Burpees', '1 Mile Run'] },
    // ... other days
  ],
  recovery: [
    { day: 'Monday', activities: ['E-Stim', 'Laser Mobility', 'Laser Prehab', 'BFR (Recovery)', 'Game Ready', 'Stretching'] },
    // ... other days
  ]
};

export default async function SchedulePage() {
    const supabase = createServerComponentClient({ cookies });

    const {
      data: { user },
    } = await supabase.auth.getUser();

  return (
    <div className='base'>
        <NavBar user={user} />
        <div className='below-bar no-banner'>
            <div className="parent-container">
                <div className="schedule-container">
                <div className="strength-training">
                    <h1>Strength Training</h1>
                    {workoutSchedule.strengthTraining.map(session => (
                    <div key={session.day}>
                        <h2>{session.day}</h2>
                        {session.exercises.map(exercise => (
                        <p key={exercise}>{exercise}</p>
                        ))}
                    </div>
                    ))}
                </div>
                <div className="conditioning">
                    <h1>Conditioning</h1>
                    {workoutSchedule.conditioning.map(session => (
                    <div key={session.day}>
                        <h2>{session.day}</h2>
                        {session.exercises.map(exercise => (
                        <p key={exercise}>{exercise}</p>
                        ))}
                    </div>
                    ))}
                </div>
                <div className="recovery">
                    <h1>Recovery</h1>
                    {workoutSchedule.recovery.map(session => (
                    <div key={session.day}>
                        <h2>{session.day}</h2>
                        {session.activities.map(activity => (
                        <p key={activity}>{activity}</p>
                        ))}
                    </div>
                    ))}
                </div>
                </div>
            </div>
        </div>
    </div>
  );
};

