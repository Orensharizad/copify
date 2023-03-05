'use client'
import React, { useEffect, useState } from 'react'
import { stationService } from '../../../services/station.service'
import { shuffle } from 'lodash';
import SongList from "../../../components/SongList";


function StationDetails({ params: { id } }) {
    const [station, setStation] = useState()
    const [color, setColor] = useState(null)

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
        getStation()
        setColor(shuffle(colors).pop())

    }, [])

    const getStation = async () => {
        try {
            const station = await stationService.getById(id)
            setStation(station)

        } catch (err) {
            console.log('cannot get station by id', err)
        }
    }
    return (
        <div className=' flex-grow h-screen overflow-y-scroll scrollbar-hide  '>
            <section className={`flex items-end space-x-7 bg-gradient-to-b to-black ${color}  h-80 text-white p-8 `}>
                <img className='w-44 h-44 shadow-2xl' src={station?.imgUrl} alt="" />
                <div>
                    <p>PLAYLIST</p>
                    <h2 className='text-2xl md:text-3xl lg:text-5xl font-bold'>{station?.name}</h2>
                </div>
            </section>
            <SongList station={station} />
        </div>
    )
}

export default StationDetails