"use client"
import React from 'react'
import { useSession , signIn , signOut } from 'next-auth/react'

type Props = {}

const Test = (props: Props) => {
    const { data: session, status } = useSession()
  return (
    <div>
        {status === 'loading' && <div className='flex mt-16'>Loading...</div>}
        {status === 'authenticated' && (
            <div className='mt-16'>
                Signed in as {session?.user?.email ?? 'unknown email'}
                <button className='bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded' onClick={() => signOut()}>Sign out</button>
            </div>
        )}
        {status === 'unauthenticated' && (
            <div className='mt-20'>Not signed in
                <button className='bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded' onClick={() => signIn()}>Sign in</button>

            </div>
        )}

    </div>
  )
}


export default Test