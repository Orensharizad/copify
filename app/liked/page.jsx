'use client'
import React, { useEffect, useState } from 'react'
import { songService } from '../../services/song.service'
import { shuffle } from 'lodash';
import SongList from "../../components/SongList";
import { useRecoilState } from 'recoil';
import { currSongState, currStationState, isPlayingState } from '../../atoms/songAtom';
import Loader from '../../components/Loader';
import { HeartIcon, } from "@heroicons/react/24/outline"
import { collection, getDocs, } from "firebase/firestore";
import { auth, db, } from '../../firebase'
import { useAuthState } from 'react-firebase-hooks/auth';






function LikedSong({ params: { id } }) {
    const [songs, setSongs] = useState()
    const [station, setStation] = useState(null)
    const [currStation, setCurrStation] = useRecoilState(currStationState)
    const [color, setColor] = useState(null)
    const [currSong, setCurrSong] = useRecoilState(currSongState)
    const [isPlaying, setIsPlaying] = useRecoilState(isPlayingState)
    const [user, loading, error] = useAuthState(auth);


    const colors = [
        'from-indigo-500',
        'from-blue-500',
        'from-green-500',
        'from-red-500',
        'from-yellow-500',
        'from-pink-500',
        'from-purple-500',
    ]


    useEffect(() => {
        setColor(shuffle(colors).pop())
        getLikedSongs()

    }, [])





    const getLikedSongs = async () => {

        try {
            const res = await getDocs(collection(db, 'users', user.email, 'songs'))
            const likedSongIds = res.docs.map(doc => doc.data())
            const songs = await songService.query()
            const likedSongs = songs.reduce((acc, song) => {
                likedSongIds.forEach(s => {
                    if (song.id === s.songId) return acc.push(song)

                })
                return acc

            }, [])
            const station = {
                _id: 'likedSongs101',
                name: 'Liked Songs',
                songs: likedSongs,
                imgUrl: 'https://res.cloudinary.com/damrhms1q/image/upload/v1674838098/likedSongPic_lrwwnc.png'
            }
            setStation(station)


        } catch (err) {
            console.log('err:', err)
        }

    }

    const onPlayStation = (ev, diff) => {
        ev.stopPropagation()
        setCurrStation(station)
        setIsPlaying(diff)
        // setCurrSong(station.songs[0])

    }




    if (!station) return <Loader />
    return (
        <div className=' flex-grow h-screen overflow-y-scroll scrollbar-hide  '>
            <section className={` bg-gradient-to-b to-black ${color}  h-80 text-white p-8 `}>
                <div className='flex items-end space-x-7 '>
                    <img className='w-44 h-44 shadow-2xl' src={station?.imgUrl} alt="" />
                    <div>
                        <p>PLAYLIST</p>
                        <h2 className='text-2xl md:text-3xl lg:text-5xl font-bold'>{station?.name}</h2>
                    </div>
                </div>
                <section className='p-8 text-white flex items-center gap-4'>
                    <div className={`h-12 w-12 rounded-full flex items-center justify-center bg-[#1ed760] transition-all delay-75 ease-in-out cursor-pointer hover:scale-105 `}>
                        {station?._id === currStation?._id && isPlaying
                            ?
                            <svg onClick={(ev) => onPlayStation(ev, false)} role="img" height="24" width="24" aria-hidden="true" viewBox="0 0 24 24" data-encore-id="icon" ><path d="M5.7 3a.7.7 0 00-.7.7v16.6a.7.7 0 00.7.7h2.6a.7.7 0 00.7-.7V3.7a.7.7 0 00-.7-.7H5.7zm10 0a.7.7 0 00-.7.7v16.6a.7.7 0 00.7.7h2.6a.7.7 0 00.7-.7V3.7a.7.7 0 00-.7-.7h-2.6z"></path></svg>

                            :
                            <svg
                                onClick={(ev) => onPlayStation(ev, true)} role="img" height="24" width="24" aria-hidden="true" viewBox="0 0 24 24" data-encore-id="icon" ><path d="M7.05 3.606l13.49 7.788a.7.7 0 010 1.212L7.05 20.394A.7.7 0 016 19.788V4.212a.7.7 0 011.05-.606z"></path></svg>}

                    </div>
                    <HeartIcon className='h-10 w-10 opacity-50 cursor-pointer hover:opacity-100' />
                </section>
            </section>

            <SongList station={station} />

        </div>
    )
}

export default LikedSong