import { getById } from "../../../lib/mongo/station";

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

    res.setHeader('Content-Type', 'application/json')
    res.status(425).end(`Method ${req.method} is not allowed}`)
}

export default handler