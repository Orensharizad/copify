import { ObjectId } from "mongodb";
import { getCollection } from "./index";


export async function getStations(filterBy = {}) {
    try {
        const collection = await getCollection('station')
        const stations = await collection.find({}).toArray()
        return stations
    } catch (err) {
        console.error('cannot find station', err)
        throw err
    }

}

export async function getById(stationId) {
    try {
        const collection = await getCollection('station')
        const station = collection.findOne({ _id: new ObjectId(stationId) })
        return station
    } catch (err) {
        console.error(`while finding station ${stationId}`, err)
        throw err
    }
}

export async function update(station) {
    try {
        const stationToSave = {
            name: station.name,
            description: station.description,
            songs: station.songs,
            imgUrl: station.imgUrl,
            shareWith: station.shareWith,
            shareBy: station.shareBy
        }
        const collection = await getCollection('station')
        await collection.updateOne({ _id: new ObjectId(station._id) }, { $set: stationToSave })
        return stationToSave
    } catch (err) {
        console.error(`cannot update station from service------------ `, err)
        throw err
    }
}

export async function add(station) {
    try {
        const collection = await getCollection('station')
        await collection.insertOne(station)
        return station
    } catch (err) {
        console.error('cannot insert station', err)
        throw err
    }
}

export async function remove(stationId) {
    try {
        const collection = await getCollection('station')
        await collection.deleteOne({ _id: new ObjectId(stationId) })
        return stationId
    } catch (err) {
        console.error(`cannot remove station `, err)
        throw err
    }
}



