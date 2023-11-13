import '../globals.css';
import { createServerComponentClient } from '@supabase/auth-helpers-nextjs'
import { cookies } from 'next/headers'
import NavBar from '../components/NavBar';
import Footer from '../components/Footer';
import Link from 'next/link'

export const dynamic = 'force-dynamic'

export default async function Analytics() {
  const supabase = createServerComponentClient({ cookies })

  const {
    data: { user },
  } = await supabase.auth.getUser()

  return (
    <div className='base'>
        <NavBar user={user} />
        <div className="below-bar no-banner">
          <div className="parent-container">
            <div className="content-area">
                <div className="section">
                    <h1>Analytics</h1>
                    <h2>Coming soon...</h2>
                </div>
            </div>
        </div>
        </div>
        <Footer />
    </div>
  )
}