'use client'

import { useEffect, useState } from 'react'
import StationList from '../components/StationList';
import { stationService } from '../services/station.service';

function StationIndex() {

    const [stations, setStations] = useState([])
    
    useEffect(() => {
        loadStations()
    }, [])

    const loadStations = async () => {
        try {
            const stations = await stationService.query()
            setStations(stations)

        } catch (err) {
            console.log('err: cannot load Stations:', err)
        }

    }

    return (
        <section className='flex-grow h-screen overflow-y-scroll scrollbar-hide '>
            <StationList stations={stations} />

        </section>

    )
}

export default StationIndex