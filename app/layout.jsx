'use client'
import { useEffect, useState } from "react";
import SideBar from "../components/SideBar"
import Player from "../components/Player"
import '../styles/globals.css'
import { RecoilRoot } from "recoil"
import LoginPage from "../components/LoginSignUp"
import { useAuthState } from 'react-firebase-hooks/auth';
import { auth } from "../firebase";
import Loader from "../components/Loader"
import AppHeader from "../components/AppHeader"



export const metadata = {
  title: 'Next.js',
  description: 'Generated by Next.js',
}

export default function RootLayout({ children }) {
  const [user, loading, error] = useAuthState(auth);
  const isLogin = JSON.parse(sessionStorage.getItem('user'))



  return (
    <RecoilRoot>
      <html lang="en" className="overflow-hidden">
        <head />
        <body className="">
          {
            !user ? <LoginPage />
              :
              <>
                <main className="bg-black h-screen  flex   ">
                  <SideBar />
                  <div className='flex flex-col w-full ' >
                    <AppHeader user={user} />
                    <div className='flex-1 '>{children}</div>
                  </div>
                </main>
                <div className='sticky bottom-0'> <Player /></div>
              </>
          }
        </body>
      </html>
    </RecoilRoot>
  )
}
