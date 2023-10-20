import '../globals.css';
import { createServerComponentClient } from '@supabase/auth-helpers-nextjs'
import { cookies } from 'next/headers'
import NavBar from '../components/NavBar';
import Link from 'next/link'

export const dynamic = 'force-dynamic'

export default async function Home() {
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
            <h1>Data Guidelines</h1>
            <h2>Introduction</h2>
            <p>The University of Louisville and its affiliated health care organizations are committed to maintaining the privacy, confidentiality, and security of Protected Health Information (PHI) as mandated by the Health Insurance Portability and Accountability Act (HIPAA). PHI encompasses information concerning an individual&apos;s past, present, or future physical or mental health, the provision of health care, and payment for health care, which is received from, created, or received on behalf of the University.</p>
        </div>

        <div className="section">
            <h2>Responsibilities</h2>
            <p>All members affiliated as students, faculty, or staff with the University and its health care partners are expected to adhere to the highest standards of privacy and confidentiality concerning PHI and other confidential information they may encounter, including financial data and operational information.</p>

        </div>

        <div className="section">
            <h2>Compliance</h2>
            <p>Failure to comply with these guidelines may result in disciplinary action, including termination of affiliation with the University and its health care partners.</p>
        </div>

        <div className="section">
            <h2>Frequently Asked Questions (FAQs)</h2>

            <h3>Privacy and Data Security</h3>
            <div className="question">
                <b>Q:</b> Who has access to my personal data?
            </div>
            <div className="answer">
                <b>A:</b> Team members and staff can view your player statistics. However, medical data is strictly governed by HIPAA laws, making it accessible only to the individual concerned and their designated medical trainer.
            </div>
            <p></p>
            <div className="question">
                <b>Q:</b> How is my data protected?
            </div>
            <div className="answer">
                <b>A:</b> We adhere to HIPAA regulations and employ robust security measures to ensure the privacy and safety of your data.
            </div>

            <h3>Website Access</h3>
            <div className="question">
                <b>Q:</b> Can anyone log in and view the website?
            </div>
            <div className="answer">
                <b>A:</b> No, the website is exclusively for the UofL Basketball Team and coaching staff.
            </div>

            <h3>Player and Game Statistics</h3>
            <div className="question">
                <b>Q:</b> When are player and game statistics updated?
            </div>
            <div className="answer">
                <b>A:</b> Statistics are updated within 24 hours following the most recent game.
            </div>
            <p></p>
            <div className="question">
                <b>Q:</b> Who will be reviewing the player and game statistics?
            </div>
            <div className="answer">
                <b>A:</b> UofL coaches and team members have access to these statistics for monitoring purposes.
            </div>
        </div>
    </div>
    </div>
    </div>
    </div>
  )
}