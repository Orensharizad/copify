'use client'
import React, { useEffect, useState } from 'react'
import { stationService } from '../../../services/station.service'
import { shuffle } from 'lodash';
import SongList from "../../../components/SongList";
import { useRecoilState } from 'recoil';
import { currSongState, currStationState, isPlayingState } from '../../../atoms/songAtom';
import Loader from '../../../components/Loader';
import { HeartIcon, } from "@heroicons/react/24/outline"
import { useAuthState } from 'react-firebase-hooks/auth';
import { auth, db } from '../../../firebase';
import { addDoc, collection, deleteDoc, doc, getDocs } from 'firebase/firestore';
import AddSong from '../../../components/AddSong';





function StationDetails({ params: { id } }) {
    const [station, setStation] = useState()
    const [currStation, setCurrStation] = useRecoilState(currStationState)
    const [color, setColor] = useState(null)
    const [currSong, setCurrSong] = useRecoilState(currSongState)
    const [isPlaying, setIsPlaying] = useRecoilState(isPlayingState)
    const [isLikedStation, setIsLikedStation] = useState(false)

    const [user] = useAuthState(auth);


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

    }, [currSong])

    useEffect(() => {
        getStation()

    }, [])


    const toggleIsLike = async (ev) => {
        ev.stopPropagation()
        try {
            isLikedStation ? onRemoveLikedStation() : onAddLikedStation()

        } catch (err) {
            console.log('err:', err)
        }



    }

    const onAddLikedStation = async () => {
        try {
            await addDoc(collection(db, 'users', user?.email, 'stations'), { stationId: station._id })
            setIsLikedStation(true)
        } catch (e) {
            console.error("Error adding document: ", e);
        }

    }

    const onRemoveLikedStation = async () => {
        const res = await getDocs(collection(db, 'users', user?.email, 'stations'))
        const likedStations = res.docs.map(doc => {
            return {
                _id: doc.id,
                stationId: doc.data()
            }
        })
        const currStationIdx = likedStations.findIndex(s => s.stationId.stationId === station._id)
        const currId = likedStations[currStationIdx]._id
        try {
            await deleteDoc(doc(db, 'users', user?.email, 'stations', currId))
            setIsLikedStation(false)

        } catch (err) {
            console.log('err:', err)
        }
    }

    const loadIsLikedStation = async (station) => {
        try {
            const res = await getDocs(collection(db, 'users', user?.email, 'stations'))
            const likedStations = res.docs.map(doc => doc.data())
            const isLikedStation = likedStations.some(s => s.stationId.includes(station._id))
            setIsLikedStation(isLikedStation)

        } catch (err) {
            console.log('err:', err)
        }
    }





    const getStation = async () => {
        try {
            const station = await stationService.getById(id)
            setStation(station)
            setCurrSong(station.songs[0])
            loadIsLikedStation(station)


        } catch (err) {
            console.log('cannot get station by id', err)
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
        <div className=' flex-grow h-screen overflow-y-scroll scrollbar-hide   '>
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
                    <HeartIcon onClick={toggleIsLike} className={`h-10 w-10  cursor-pointer hover:opacity-70 ${isLikedStation && 'fill-[#1ed760] stroke-[#1ed760] opacity-100'}`} />
                </section>
            </section>

            <SongList station={station} />

        </div>
    )
}

export default StationDetails