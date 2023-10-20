import { createServerComponentClient } from '@supabase/auth-helpers-nextjs'
import { cookies } from 'next/headers'
import { Database } from '../database.types'
import AccountForm from './account-form'
import NavBar from '../components/NavBar';

export const dynamic = 'force-dynamic'

export default async function Account() {
  const supabase = createServerComponentClient<Database>({ cookies })

  const {
    data: { session },
  } = await supabase.auth.getSession()

  const {
    data: { user },
  } = await supabase.auth.getUser()

  return(
    <div className='base'>
   <NavBar user={user} />
   <AccountForm session={session} />
   </div>
  )
}
