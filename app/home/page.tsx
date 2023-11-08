import '../globals.css';
import { createServerComponentClient } from '@supabase/auth-helpers-nextjs'
import { cookies } from 'next/headers'
import NavBar from '../components/NavBar';
import Footer from '../components/Footer';
import Link from 'next/link'

export const dynamic = 'force-dynamic'

export default async function Home() {
  const supabase = createServerComponentClient({ cookies })
  const { data: games } = await supabase.from("recentgames").select();
  const { data: upcomingGame } = await supabase.from('upcoming_game').select('*').single();

  const {
    data: { user },
  } = await supabase.auth.getUser()

  return (
    <div className='base'>
      {/* Navigation Bar */}
      <NavBar user={user} />
      {/* Banner Image */}
      <div className="banner">
        <img src="/images/mens_basket_banner.png" alt="Men's Basketball Banner" />
      </div>
      <div className='below-bar'>
          <div className="parent-container">
              <div className="main-content-row">
                  <div className='content-area content-area-1'>
                    <div className="search-bar">
                      <input type="text" placeholder="Search for games, players, etc." />
                      <button className="button" type="submit">Search</button>
                    </div>
                  </div>
                <div className='content-area content-area-1'>
                  <h2>Days Until Game: {upcomingGame.days_until_game}</h2>
                </div>
              </div>
          </div>
          <div className="parent-container-2">
          <div className='content-area content-area-2'>
            {/* Upcoming Game Section */}
            {upcomingGame && (
              <div>
                <h2>Next Game</h2>
                <div className="table w-full">
                  <div className="grid grid-cols-2 header-cell">
                    <div>Opponent</div>
                    <div>Date</div>
                  </div>
                  <div className="grid grid-cols-2 cell">
                    <div>{upcomingGame.opponent_team}</div>
                    <div>{upcomingGame.game_date}</div>
                  </div>
                </div>
              </div>
            )}
          </div>
            <div className='content-area content-area-2'>
              {/* Game Information Section */}
              <h2 className="text-lg font-bold text-center">Recent Games</h2>
                <div className="table w-full">
                  {/* Headers Section */}
                  <div className="col-span-5 grid grid-cols-5 header-cell">
                    <div>Date</div>
                    <div>Opponent</div>
                    <div>Louisville Points</div>
                    <div>Opponent Points</div>
                    <div>Result</div>
                  </div>

                  {/* Game Data Section */}
                  {games?.map((game, index) => (
                    <div key={index} className="grid grid-cols-5 cell">
                      <div>{game.game_date}</div>
                      <div className="row">{game.opponent_team}</div>
                      <div className="row">{game.louisville_points}</div>
                      <div className="row">{game.opponent_points}</div>
                      <div className="row">{game.result}</div>
                    </div>
                  ))}
                </div>
            </div>
          </div>
      </div>
      {/* Footer Section for Quick Access to News and Updates */}
      <Footer />
    </div>
  )
}