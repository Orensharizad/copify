'use client'

import { BuildingLibraryIcon, HeartIcon, HomeIcon, MagnifyingGlassIcon, PlusCircleIcon, RssIcon, } from "@heroicons/react/24/solid"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { useState, useEffect } from "react"
import { useRecoilState } from "recoil"
import { currStationsState } from "../atoms/songAtom"
import { stationService } from "../services/station.service"

function SideBar({ user }) {
    const router = useRouter()
    const [userStations, setUserStations] = useState([])
    const [stations, setStations] = useRecoilState(currStationsState)


    useEffect(() => {
        getUserPlaylist()
    }, [user, stations])

    const getUserPlaylist = async () => {
        if (!user) return
        try {
            const stations = await stationService.query()
            const userPlaylist = stations.filter(station => station?.createdBy?._id === user.uid)
            if (!userPlaylist) return
            setUserStations(userPlaylist)

        } catch (err) {
            console.log('err: cannot get stations', err)
        }

    }

    const onCreatePlaylist = async () => {
        const station = stationService.getEmptyStation(user)
        try {
            const newStation = await stationService.save(station)
            setUserStations(prev => [...prev, newStation])
            router.push(`details/${newStation._id}`)
        } catch (err) {
            console.log('err: cannot add playlist', err)
        }

    }



    return (
        <div className="bg-black text-white p-5 text-xs border-r border-gray-900 overflow-hidden h-screen scrollbar-hide lg:text-sm sm:max-w-[12rem] lg:min-w-[15rem] hidden md:inline-flex ">
            <div className="space-y-4 text-md font-bold">
                <div className="flex items-center justify-center gap-3">
                    <img className="w-10 h-10" src="https://playlist-kqq9.onrender.com/static/media/logo-pic-white.0b8c5ac6eec4a813c1c2.png" alt="" />
                    <h3 className="text-3xl bold">Copyfy</h3>
                </div>
                <Link href="/" className="sidebar-item">
                    <HomeIcon className="h-6 w-6" />
                    <p>Home</p>
                </Link>
                <Link href="/search" className="sidebar-item">
                    <MagnifyingGlassIcon className="h-6 w-6" />
                    <p>Search</p>
                </Link>
                <Link href={'/libary'} className="sidebar-item">
                    <BuildingLibraryIcon className="h-6 w-6" />
                    <p>Your Libary</p>
                </Link>

                <button onClick={onCreatePlaylist} className="sidebar-item">
                    <PlusCircleIcon className="h-6 w-6" />
                    <p>Create Playlist</p>
                </button>
                <Link href={'/liked'} className="sidebar-item">
                    <HeartIcon className="h-6 w-6" />
                    <p>Liked Songs</p>
                </Link>

                {!!userStations.length &&
                    <>
                        <hr className="sidebar-item" />
                        {userStations.map((station) =>
                            <Link key={station._id} href={`details/${station._id}`}>
                                <p className="sidebar-item py-2"> {station.name}</p>
                            </Link>)}
                    </>
                }

            </div>
        </div>
    )
}

export default SideBar