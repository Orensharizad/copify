import { getById, update, remove } from "../../../lib/mongo/station";

const handler = async (req, res) => {

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
        try {
            const station = req.body
            const updatedStation = await update(station)
            return res.status(200).json(updatedStation)

        } catch (err) {
            console.error('Failed to update station', err)
            res.status(500).send({ err: 'Failed to update station' })
        }
    }

    if (req.method === 'DELETE') {
        try {
            const { id } = req.query
            const removredStation = await remove(id)
            return res.status(200).json(removredStation)
        } catch (err) {
            console.error('Failed to remove station', err)
            res.status(500).send({ err: 'Failed to remove station' })
        }
    }

    // res.setHeader('Content-Type', 'application/json')
    res.status(425).end(`Method ${req.method} is not allowed}`)
}

export default handler