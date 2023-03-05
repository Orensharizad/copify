'use client'

import { useEffect, useState } from 'react'
import { stationService } from '../services/station.service';
import StationList from './StationList'

function StationIndex() {

    const [stations, setStations] = useState([])
    console.log('stations: ', stations);

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