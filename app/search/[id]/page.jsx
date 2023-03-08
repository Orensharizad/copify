'use client'
import { useState, useEffect } from 'react'
import Loader from '../../../components/Loader'
import StationList from '../../../components/StationList'
import { stationService } from '../../../services/station.service'

function Genre({ params: { id } }) {
    const [stations, setStations] = useState([])
    const [genre, setGenre] = useState(null)

    useEffect(() => {
        loadGenreStations()
    }, [])

    const loadGenreStations = async () => {
        const genres = stationService.getGenre()
        const genre = genres.filter(genre => genre.id === id)
        setGenre(genre[0])
        try {
            const stations = await stationService.query()
            const genreStations = stations.filter(station => station.tags.includes(genre[0].title))
            setStations(genreStations)
        } catch (err) {
            console.log('err:', err)
        }
    }



    if (!stations || !genre) return <Loader />
    return (
        <div className='px-4 h-screen overflow-y-scroll scrollbar-hide pb-40 '>
            <h3 className='text-white text-7xl py-8 font-bold'>{genre?.title}</h3>
            <StationList stations={stations} />

        </div>
    )
}

export default Genre