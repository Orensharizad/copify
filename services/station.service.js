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
    getEmptyStation
}

async function query() {
    return await storageService.query(STATION_KEY)

}



function getById(stationId) {
    return storageService.get(STATION_KEY, stationId)
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
    const stored = localStorage.getItem(key);
    let stations = stored ? JSON.parse(stored) : '';
    if (!stations || !stations.length) {
        stations = homeStations
        localStorage.setItem(STATION_KEY, JSON.stringify(stations))
    }
}
