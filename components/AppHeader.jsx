'use client'
import React, { useEffect, useState } from 'react'
import { UserIcon, ChevronDownIcon } from '@heroicons/react/24/solid';
import { getAuth, signOut } from "firebase/auth";




function AppHeader({ user }) {
    const auth = getAuth();



    const onSignOut = async () => {
        try {
            await signOut(auth)
            sessionStorage.removeItem('user')

        } catch (err) {
            console.log('err:', err)
        }

    }


    return (
        <section className={`h-16 flex `}>
            <header className='flex items-center justify-end w-full h-16'>
                <div onClick={onSignOut} className='flex items-center bg-black text-white space-x-3 opacity-90 hover:opacity-80 cursor-pointer rounded-full p-1 pr-2 mr-8   z-50'>
                    <UserIcon className='rounded-full w-5 h-5 ' />
                    <h2 className='font-bold text-xs'>{user?.email}</h2>
                    <ChevronDownIcon className='h-5 w-5' />
                </div>
            </header>
        </section>
    )
}

export default AppHeader