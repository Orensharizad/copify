import { ObjectId } from "mongodb";
import { getCollection } from "./index";


export async function getSongs(filterBy = {}) {
    try {
        const collection = await getCollection('song')
        const songs = await collection.find({}).toArray()
        return songs
    } catch (err) {
        console.error('cannot find songs', err)
        throw err
    }

}

export async function getById(songId) {
    try {
        const collection = await getCollection('song')
        const songs = collection.findOne({ _id: new ObjectId(songId) })
        return songs
    } catch (err) {
        console.error(`while finding songs ${songId}`, err)
        throw err
    }
}



