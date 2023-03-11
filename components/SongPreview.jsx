'use client'

import { HeartIcon, TrashIcon } from '@heroicons/react/24/outline';
import { useEffect, useState } from 'react'
import { useRecoilState } from 'recoil';
import { currSongState } from '../atoms/songAtom';
import { YoutubeService } from '../services/youtube.service';
import { collection, addDoc, getDocs, getDoc, doc, deleteDoc } from "firebase/firestore";
import { auth, db, } from '../firebase'
import { useAuthState } from 'react-firebase-hooks/auth';

function SongPreview({ song, order }) {
    const [duration, setDuration] = useState('--:--')
    const [currSong, setCurrSong] = useRecoilState(currSongState)
    const [isHover, setIsHover] = useState(false)

    const [isLikedSong, setIsLikedSong] = useState(false)
    const [user, loading, error] = useAuthState(auth);



    useEffect(() => {
        loadSongDuration()
        loadIsLikedSong()
    }, [])

    const toggleIsLike = async (ev) => {
        ev.stopPropagation()
        try {

            isLikedSong ? onRemoveLikedSong() : onAddLikedSong()

        } catch (err) {
            console.log('err:', err)
        }



    }

    const onAddLikedSong = async (ev) => {
        try {
            await addDoc(collection(db, 'users', user?.email, 'songs'), { songId: song.id })
            setIsLikedSong(true)
        } catch (e) {
            console.error("Error adding document: ", e);
        }

    }

    const onRemoveLikedSong = async (ev) => {
        const res = await getDocs(collection(db, 'users', user?.email, 'songs'))
        const likedSongs = res.docs.map(doc => {
            return {
                _id: doc.id,
                songId: doc.data()
            }
        })
        const currSongIdx = likedSongs.findIndex(s => s.songId.songId === song.id)
        const currId = likedSongs[currSongIdx]._id
        try {
            await deleteDoc(doc(db, 'users', user?.email, 'songs', currId))
            setIsLikedSong(false)

        } catch (err) {
            console.log('err:', err)
        }
    }

    const loadIsLikedSong = async () => {
        try {
            const res = await getDocs(collection(db, 'users', user?.email, 'songs'))
            const likedSongs = res.docs.map(doc => doc.data())
            const isLikedSong = likedSongs.some(s => s.songId.includes(song.id))
            setIsLikedSong(isLikedSong)
            return isLikedSong

        } catch (err) {
            console.log('err:', err)
        }
    }

    const loadSongDuration = async () => {
        try {
            const duration = await YoutubeService.getSongDuration(song.id)
            setDuration(duration)
        } catch (err) {
            setDuration('--:--')
        }

    }

    const onPlaySong = () => {
        setCurrSong({ ...song })
    }





    return (
        <div onMouseEnter={() => setIsHover(true)} onMouseLeave={() => setIsHover(false)} onClick={onPlaySong} className='grid grid-cols-2 text-gray-500 py-2 px-5 hover:bg-[#3a3a3aa9] rounded-lg cursor-pointer '>
            <div className={`flex items-center space-x-4 ${currSong.id === song.id ? 'text-green-500' : ''}`}>
                <p>{order + 1}</p>
                <img className='h-10 w-10' src={song.imgUrl} />
                <div>
                    <p className='w-36 lg:w-64  truncate'>{song.title}</p>
                    <p className='w-40 text-white '>{song.channelTitle}</p>
                </div>
            </div>
            <div className='flex items-center justify-end gap-10 ml-auto md:ml-0' >
                <HeartIcon onClick={ev => toggleIsLike(ev)} className={`h-5 w-5 opacity-0  cursor-pointer text-white ${isHover && 'opacity-100'} ${isLikedSong && 'fill-[#1ed760] stroke-[#1ed760] opacity-100'}`} />
                <p>{duration}</p>
                <TrashIcon className={`h-5 w-5 opacity-0  cursor-pointer text-white ${isHover && 'opacity-100'}`} />
            </div>
        </div>
    )
}

export default SongPreview