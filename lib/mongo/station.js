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



