import { getById, update } from "../../../lib/mongo/station";

const handler = async (req, res) => {

    console.log('req.method:', req.method)
    if (req.method === 'GET') {
        const { id } = req.query
        try {
            const station = await getById(id)
            return res.status(200).json(station)
        } catch (err) {
            return res.status(500).json({ error: err.message })
        }
    }

    if (req.method === 'PUT') {
        console.log('req.body:', req.body)
        try {
            const station = req.body
            const updatedStation = await update(station)
            res.json(updatedStation)
        } catch (err) {
            console.error('Failed to update station', err)
            res.status(500).send({ err: 'Failed to update station' })
        }
    }

    res.setHeader('Content-Type', 'application/json')
    res.status(425).end(`Method ${req.method} is not allowed}`)
}

export default handler