'use client'

import React, { useEffect, useState } from 'react'
import { YoutubeService } from '../services/youtube.service';

function SongPreview({ song, order }) {
    const [duration, setDuration] = useState('--:--')

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

    return (
        <div className='grid grid-cols-2 text-gray-500 py-4 px-5 hover:bg-gray-900 rounded-lg cursor-pointer'>
            <div className='flex items-center space-x-4'>
                <p>{order + 1}</p>
                <img className='h-10 w-10' src={song.imgUrl} />
                <div>
                    <p className='w-36 lg:w-64 text-white truncate'>{song.title}</p>
                    <p className='w-40 '>{song.channelTitle}</p>
                </div>
            </div>
            <div className='flex items-center justify-end ml-auto md:ml-0' >
                {/* <p className='w-40 hidden md:inline'>{song.album.name}</p> */}
                <p>{duration}</p>
            </div>
        </div>
    )
}

export default SongPreview