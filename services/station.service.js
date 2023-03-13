
import { httpService } from './http.service.js'

export const stationService = {
    query,
    getById,
    remove,
    save,
    removeSong,
    getEmptyStation,
    getGenre

}

function query() {
    return httpService.get('station')
}

function getById(stationId) {
    return httpService.get('station/' + stationId)

}

function save(station) {
    if (station._id) {
        return httpService.put('station/' + station._id, station)
    } else {
        return httpService.post('station/', station)
    }
}

function remove(stationId) {
    return httpService.delete('station/' + stationId)
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

function getEmptyStation(user) {
    return {
        "name": '#MyPlaylist',
        "tags": [],
        "imgUrl": "https://res.cloudinary.com/dsvs2bgn4/image/upload/v1678635352/emptystation_bxa0bl.png",
        "createdBy": {
            _id: user.uid,
            username: user.email,
        },
        "songs": [],
    }
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

