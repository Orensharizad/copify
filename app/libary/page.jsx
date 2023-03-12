'use client'

import { collection, getDocs } from "firebase/firestore"
import { useState } from "react"
import { useEffect } from "react"
import { useAuthState } from "react-firebase-hooks/auth"
import Loader from "../../components/Loader"
import StationList from "../../components/StationList"
import { auth, db } from "../../firebase"
import { stationService } from "../../services/station.service"

function Libary() {
    const [stations, setStations] = useState([])
    const [user] = useAuthState(auth);


    useEffect(() => {
        getLikedStations()
    }, [])


    const getLikedStations = async () => {

        try {
            const res = await getDocs(collection(db, 'users', user.email, 'stations'))
            const likedStationIds = res.docs.map(doc => doc.data())
            const stations = await stationService.query()
            const likedStations = stations.reduce((acc, station) => {
                likedStationIds.forEach(s => {
                    if (station._id === s.stationId) return acc.push(station)

                })
                return acc

            }, [])

            setStations(likedStations)

        } catch (err) {
            console.log('err:', err)
        }

    }


    if (!stations) return <Loader />
    return (
        <section className=' p-4 '>
            <h3 className='text-3xl font-bold text-white pb-4'>Your Libary</h3>
            <StationList stations={stations} />
            {!stations.length && <h3 className='text-3xl font-bold text-white pb-4'>You still have nothing here</h3>}
        </section>
    )
}

export default Libary