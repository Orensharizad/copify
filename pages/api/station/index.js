import { getStations, add } from "../../../lib/mongo/station";

const handler = async (req, res) => {
    if (req.method === 'GET') {
        try {
            const stations = await getStations()
            return res.status(200).json(stations)
        } catch (err) {
            return res.status(500).json({ error: err.message })
        }
    }

    if (req.method === 'POST') {
        try {
            const station = req.body
            await add(station)
            return res.status(200).json(station)
        } catch (err) {
            return res.status(500).json({ error: err.message })
        }

    }

    res.setHeader('Alllow', ['GET'])
    res.status(425).end(`Method ${req.method} is not allowed}`)
}

export default handler