'use client'
import React, { useEffect, useState } from 'react'
import { stationService } from '../../../services/station.service'
import { shuffle } from 'lodash';
import SongList from "../../../components/SongList";
import { useRecoilState } from 'recoil';
import { currSongState, currStationsState, currStationState, isPlayingState } from '../../../atoms/songAtom';
import Loader from '../../../components/Loader';
import { HeartIcon, } from "@heroicons/react/24/outline"
import { useAuthState } from 'react-firebase-hooks/auth';
import { auth, db } from '../../../firebase';
import { addDoc, collection, deleteDoc, doc, getDocs } from 'firebase/firestore';
import AddSong from '../../../components/AddSong';
import EditModal from '../../../components/EditModal';
import { toast } from 'react-hot-toast';
import { PlayIcon, StopIcon } from '../../../lib/iconLibary';
import { TrashIcon } from '@heroicons/react/24/outline';
import { useRouter } from 'next/navigation';


function StationDetails({ params: { id } }) {
    const [station, setStation] = useState()
    const [stations, setStations] = useRecoilState(currStationsState)
    const [currStation, setCurrStation] = useRecoilState(currStationState)
    const [color, setColor] = useState(null)
    const [currSong, setCurrSong] = useRecoilState(currSongState)
    const [isPlaying, setIsPlaying] = useRecoilState(isPlayingState)
    const [isLikedStation, setIsLikedStation] = useState(false)
    const [isEdit, setIsEdit] = useState(false)
    const [isUserStation, setIsUserStation] = useState(false)
    const [user] = useAuthState(auth);
    const router = useRouter()



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

    }, [user])


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
        if (!user) return
        try {
            const res = await getDocs(collection(db, 'users', user?.email, 'stations'))
            const likedStations = res.docs.map(doc => doc.data())
            const isLikedStation = likedStations.some(s => s.stationId.includes(station._id))
            setIsLikedStation(isLikedStation)
            checkIsUserStation(station)

        } catch (err) {
            console.log('cannot find if is liked station:', err)
        }
    }

    const onAddSong = async (song) => {
        const isExsist = station.songs.some(currSong => currSong.id === song.id)
        if (isExsist) return toast.error("This Song already exists")
        const stationToUpdate = { ...station, songs: [song, ...station.songs] }
        try {
            await stationService.save(stationToUpdate)
            setStation(stationToUpdate)
            setCurrSong(stationToUpdate.songs[0])
            toast.success('Song Added')

        } catch (err) {
            console.log('cannot update Station', err)
        }
    }

    const onRemoveSong = async (songId) => {
        try {
            const newStation = await stationService.removeSong(station._id, songId)
            setStation(newStation)
            toast.success('Song Removed')

        } catch (err) {
            console.log('cannot remove Song:', err)
        }

    }

    const onUpdateStation = async (station) => {

        try {
            const updatedStation = await stationService.save(station)
            setStation(updatedStation)
            const newStations = stations.map(station => station._id === updatedStation._id ? updatedStation : station)
            setStations(newStations)
            setIsEdit(false)
            toast.success('Station updated ')
        } catch (err) {
            console.log('err : cannot update station:', err)

        }

    }

    const onRemoveStation = async () => {
        try {
            const removedStation = await stationService.remove(station._id)
            const newStations = stations.filter(station => station._id !== removedStation._id)
            setStations(newStations)
            toast.success('station Removed')
            router.push('/')
        } catch (err) {
            toast.error('cannot remove station')
        }

    }


    const getStation = async () => {
        try {
            const station = await stationService.getById(id)
            setStation(station)
            setCurrStation(station)
            loadIsLikedStation(station)
            if (station.songs.length) {
                setCurrSong(station.songs[0])
            }


        } catch (err) {
            console.log('cannot get station by id', err)
        }
    }

    const toggleIsPlaying = (ev) => {
        ev.stopPropagation()
        setCurrStation(station)
        setIsPlaying(prev => !prev)

    }

    const checkIsUserStation = (station) => {
        station.createdBy._id === user.uid
            ? setIsUserStation(true)
            : setIsUserStation(false)
    }




    if (!station) return <Loader />
    return (
        <div className=' flex-grow h-screen overflow-y-scroll scrollbar-hide   '>
            <section className={` bg-gradient-to-b to-black ${color}  h-80 text-white p-8 `}>
                <div onClick={() => setIsEdit(true)} className=' cursor-pointer flex items-end space-x-7 '>
                    <img className='w-44 h-44 shadow-2xl' src={station?.imgUrl} alt="" />
                    <div>
                        <p>PLAYLIST</p>
                        {station?.description && <p>{station?.description}</p>}
                        <h2 className='text-2xl md:text-3xl lg:text-5xl font-bold'>{station?.name}</h2>
                    </div>
                </div>
                <section className='p-8 text-white flex items-center gap-4'>
                    <div onClick={toggleIsPlaying} className={`h-12 w-12 rounded-full flex items-center justify-center bg-[#1ed760] transition-all delay-75 ease-in-out cursor-pointer hover:scale-105 `}>
                        {station?._id === currStation?._id && isPlaying
                            ? <StopIcon />
                            : <PlayIcon />
                        }

                    </div>
                    <HeartIcon onClick={toggleIsLike} className={`h-10 w-10  cursor-pointer hover:opacity-70 ${isLikedStation && 'fill-[#1ed760] stroke-[#1ed760] opacity-100'}`} />

                    {isUserStation && <TrashIcon onClick={onRemoveStation} className='h-6 w-6  cursor-pointer hover:opacity-70' />}
                </section>
            </section>

            <SongList station={station} onRemoveSong={onRemoveSong} />
            <AddSong onAddSong={onAddSong} />

            {isEdit && <EditModal onUpdateStation={onUpdateStation} station={station} setIsEdit={setIsEdit} />}

        </div>
    )
}

export default StationDetails