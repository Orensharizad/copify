'use client'
import { useEffect, useState } from 'react'
import { useRecoilState } from 'recoil'
import { currStationsState } from '../atoms/songAtom'
import { stationService } from '../services/station.service'
import { utilService } from '../services/util.service'
import FirstStationList from './FirstStationList'
import Loader from './Loader'
import StationList from './StationList'

function StationIndex() {

    const [stations, setStations] = useRecoilState(currStationsState)
    const timeGreet = utilService.getCurrentTimeGreet()

    useEffect(() => {
        loadStations()
    }, [])

    const loadStations = async () => {
        try {
            const res = await stationService.query()
            setStations(res)

        } catch (err) {
            console.log('err:', err)
        }
    }

    if (!stations.length) return <Loader />

    return (
        <section className='flex-grow flex-col h-screen overflow-y-scroll scrollbar-hide pb-24  ' >
            <section className='bg-gradient-to-b to-black from-[#c16967] pt-20 px-4 pb-2'>
                <h3 className='text-3xl font-bold text-white pb-4'>{timeGreet}</h3>
                <FirstStationList stations={stations?.slice(0, 6)} />
            </section>
            <section className=' p-4 '>
                <h3 className='text-3xl text-white pb-4'>Made For You</h3>
                <StationList stations={stations?.slice(7, 11)} />
            </section>
            <section className=' p-4 '>
                <h3 className='text-3xl text-white pb-4'>Chill</h3>
                <StationList stations={stations?.slice(11, 15)} />
            </section>
            <section className=' p-4 '>
                <h3 className='text-3xl text-white pb-4'>Recently played</h3>
                <StationList stations={stations?.slice(15, 19)} />
            </section>
            <section className=' p-4 pb-28 '>
                <h3 className='text-3xl text-white pb-4'>More of what you like</h3>
                <StationList stations={stations?.slice(19, 23)} />
            </section>
        </section>
    )
}

export default StationIndex