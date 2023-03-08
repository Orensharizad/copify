'use client'

import React, { useEffect, useState } from 'react'
import { useRecoilState } from 'recoil';
import { currSongState } from '../atoms/songAtom';
import { YoutubeService } from '../services/youtube.service';

function SongPreview({ song, order }) {
    const [duration, setDuration] = useState('--:--')
    const [currSong, setCurrSong] = useRecoilState(currSongState)

    useEffect(() => {
        loadSongDuration()

    }, [])


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
        <div onClick={onPlaySong} className='grid grid-cols-2 text-gray-500 py-4 px-5 hover:bg-[#3a3a3aa9] rounded-lg cursor-pointer'>
            <div className={`flex items-center space-x-4 ${currSong.id === song.id ? 'text-green-500' : ''}`}>
                <p>{order + 1}</p>
                <img className='h-10 w-10' src={song.imgUrl} />
                <div>
                    <p className='w-36 lg:w-64  truncate'>{song.title}</p>
                    <p className='w-40 text-white '>{song.channelTitle}</p>
                </div>
            </div>
            <div className='flex items-center justify-end ml-auto md:ml-0' >
                <p>{duration}</p>
            </div>
        </div>
    )
}

export default SongPreview