import '../globals.css';
import { createServerComponentClient } from '@supabase/auth-helpers-nextjs'
import { cookies } from 'next/headers'
import NavBar from '../components/NavBar';
import Link from 'next/link'

// export const dynamic = 'force-dynamic'

export default async function Home() {
  const supabase = createServerComponentClient({ cookies })
  const { data: games } = await supabase.from("louisvillerecentgames").select();

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
                  <div>Current Ranking</div>
                </div>
              </div>
          </div>
          <div className="parent-container-2">
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
                    <div key={game.game_id} className="grid grid-cols-5 cell">
                      <div>{new Date(game.game_date).toLocaleDateString()}</div>
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
      <footer className="footer">
      <h2>Contact</h2>
        <section className="news-updates">
          {/* Populate with the latest news and updates about the team */}
         
        </section>
      </footer>
    </div>
  )
}