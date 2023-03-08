import { utilService } from './util.service'
import { storageService } from './storage.service'
import { homeStations } from '../data/station'

const STATION_KEY = 'stationDB'

let stationNum = 1

export const stationService = {
    query,
    getById,
    remove,
    save,
    removeSong,
    getEmptyStation,
    getGenre

}

async function query() {
    const res = await fetch('/api/station')
    return res.json()
}


async function getById(stationId) {
    try {
        const res = await fetch(`/api/station/${stationId}`)
        return res.json()

    } catch (err) {
        console.log('err from service:', err)
    }
}

function remove(stationId) {
    return storageService.remove(STATION_KEY, stationId)
}

function save(station) {
    if (station._id) {
        return storageService.put(STATION_KEY, station)
    } else {
        return storageService.post(STATION_KEY, station)
    }
}

async function removeSong(stationId, songId) {
    try {
        const station = await getById(stationId)
        const songs = station.songs.filter(song => song.id !== songId)
        station.songs = songs
        save(station)
        return station
    } catch (err) {
        return err
    }
}

function getEmptyStation() {
    return {
        "_id": "",
        "name": _getStationDefaultName(),
        "tags": [],
        "createdBy": {
            _id: '5cksxjas89xjsa8xjsa8GGG7',
            username: 'guest',
            imgUrl: "https://robohash.org/set=set3",
            fullname: 'Guest'
        },
        "likedByUsers": [],
        "songs": [],
        "msgs": [],
    }
}
function _getStationDefaultName() {
    const stationName = `My Playlist #${stationNum}`
    stationNum++
    return stationName
}
// _createStations()
function _createStations() {
    // const stored = localStorage.getItem(key);
    // let stations = stored ? JSON.parse(stored) : '';
    // if (!stations || !stations.length) {
    //     stations = homeStations
    let stations = homeStations
    if (stations) return
    localStorage.setItem(STATION_KEY, JSON.stringify(stations))
}

function getGenre() {
    return [
        {
            imgUrl: 'https://res.cloudinary.com/damrhms1q/image/upload/v1674723861/Rock_anpilw.png',
            title: "Funk",
            id: 'g101'
        },
        {
            imgUrl: 'https://res.cloudinary.com/damrhms1q/image/upload/v1674723861/Hip-Hop_o8kiea.png',
            title: "Happy",
            id: 'g102'

        },
        {
            imgUrl: 'https://res.cloudinary.com/damrhms1q/image/upload/v1674723861/Pop_vwx3vt.png',
            title: "Pop",
            id: 'g103'

        },
        {
            imgUrl: 'https://res.cloudinary.com/damrhms1q/image/upload/v1674723847/Made_For_You_i1fiyc.png',
            title: "Made For you",
            id: 'g104'

        },
        {
            imgUrl: 'https://res.cloudinary.com/damrhms1q/image/upload/v1674723860/Latin_ng4wub.png',
            title: "Chill",
            id: 'g105'

        },
        {
            imgUrl: 'https://res.cloudinary.com/damrhms1q/image/upload/v1674723861/New_releases_vhuzn0.png',
            title: "Recently played",
            id: 'g106'

        },
        {
            imgUrl: 'https://res.cloudinary.com/damrhms1q/image/upload/v1674723847/Charts_kww67d.png',
            title: "More of what you like",
            id: 'g107'

        },
    ]
}

