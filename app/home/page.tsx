import '../globals.css';
import { createServerComponentClient } from '@supabase/auth-helpers-nextjs'
import { cookies } from 'next/headers'
import Link from 'next/link'

export const dynamic = 'force-dynamic'

const resources = [
  {
    title: 'Cookie-based Auth and the Next.js App Router',
    subtitle:
      'This free course by Jon Meyers, shows you how to configure Supabase Auth to use cookies, and steps through some common patterns.',
    url: 'https://youtube.com/playlist?list=PL5S4mPUpp4OtMhpnp93EFSo42iQ40XjbF',
    icon: 'M7 4V20M17 4V20M3 8H7M17 8H21M3 12H21M3 16H7M17 16H21M4 20H20C20.5523 20 21 19.5523 21 19V5C21 4.44772 20.5523 4 20 4H4C3.44772 4 3 4.44772 3 5V19C3 19.5523 3.44772 20 4 20Z',
  },
  {
    title: 'Supabase Next.js App Router Example',
    subtitle:
      'Want to see a code example containing some common patterns with Next.js and Supabase? Check out this repo!',
    url: 'https://github.com/supabase/supabase/tree/master/examples/auth/nextjs',
    icon: 'M10 20L14 4M18 8L22 12L18 16M6 16L2 12L6 8',
  },
  {
    title: 'Supabase Auth Helpers Docs',
    subtitle:
      'This template has configured Supabase Auth to use cookies for you, but the docs are a great place to learn more.',
    url: 'https://supabase.com/docs/guides/auth/auth-helpers/nextjs',
    icon: 'M12 6.25278V19.2528M12 6.25278C10.8321 5.47686 9.24649 5 7.5 5C5.75351 5 4.16789 5.47686 3 6.25278V19.2528C4.16789 18.4769 5.75351 18 7.5 18C9.24649 18 10.8321 18.4769 12 19.2528M12 6.25278C13.1679 5.47686 14.7535 5 16.5 5C18.2465 5 19.8321 5.47686 21 6.25278V19.2528C19.8321 18.4769 18.2465 18 16.5 18C14.7535 18 13.1679 18.4769 12 19.2528',
  },
]

const examples = [
  { type: 'Client Components', src: 'app/_examples/client-component/page.tsx' },
  { type: 'Server Components', src: 'app/_examples/server-component/page.tsx' },
  { type: 'Server Actions', src: 'app/_examples/server-action/page.tsx' },
  { type: 'Route Handlers', src: 'app/_examples/route-handler.ts' },
]



export default async function Home() {
  const supabase = createServerComponentClient({ cookies })
  const { data: games } = await supabase.from("louisvillerecentgames").select();

  const {
    data: { user },
  } = await supabase.auth.getUser()

  return (
    <div className="w-full flex flex-col bg-[var(--custom-bg-color)]">

      
        {/* Navigation Bar */}
        <nav className="navbar">
          <ul className="flex space-x-4">
            <li><a className="hover:text-[var(--custom-color-hover)]" href="#">Home</a></li>
            <li><a className="hover:text-[var(--custom-color-hover)]" href="#">Schedule</a></li>
            <li><a className="hover:text-[var(--custom-color-hover)]" href="#">Players</a></li>
          </ul>
        </nav>
        <div className="user">
          {user ? (
            <div className="text-[var(--btn-foreground)] bg-[var(--btn-background)] hover:bg-[var(--btn-background-hover)] flex items-center space-x-2">
              <span >Hey, {user.email}!</span>
              <form action="/auth/signout" method="post">
                <button className="button" type="submit">
                  Sign out
                </button>
              </form>
            </div>
          ) : (
            //remove at some point
            <Link 
              href="/login"
              className="py-2 px-4 rounded-md no-underline text-[var(--btn-foreground)] bg-[var(--btn-background)] hover:bg-[var(--btn-background-hover)]">
                Login
            </Link>
          )}
        </div>
      

      <div className="main-content">
        <div className="border-2 border-[var(--custom-color-brand)] overflow-hidden">
            <img src="/images/mens_basket_banner.png" alt="Men's Basketball Banner"/>
        </div>

        {/* Game Information Section */}
        <div className="flex flex-col gap-8 text-[var(--foreground)] mt-8">
          <h2 className="text-lg font-bold text-center">Recent Games</h2>
          <div className="w-full border rounded-lg overflow-hidden">
            <div className="grid grid-cols-3 border-b text-[var(--btn-background)] p-4">
                <div className="font-bold">Date</div>
                <div className="font-bold">Opponent</div>
                <div className="font-bold">Louisville Points</div>
                <div className="font-bold">Opponent Points</div>
                <div className="font-bold">Result</div>
            </div>
          </div>
            {games?.map((game) => (
              <div 
                key={game.game_id}
                className="w-full grid grid-cols-3 border-b text-sm p-4"
              > 
                <div>{new Date(game.game_date).toLocaleDateString()}</div>
                <div>{game.opponent_team}</div>
                <div>{game.louisville_points}</div>
                <div>{game.opponent_points}</div>
                <div>{game.result}</div>
              </div>
            ))}
        </div>
      </div>
    </div>
  )
}