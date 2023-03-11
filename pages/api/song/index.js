import { getSongs } from "../../../lib/mongo/song";

const handler = async (req, res) => {
    if (req.method === 'GET') {
        try {
            const songs = await getSongs()
            return res.status(200).json(songs)
        } catch (err) {
            return res.status(500).json({ error: err.message })
        }
    }

    res.setHeader('Alllow', ['GET'])
    res.status(425).end(`Method ${req.method} is not allowed}`)
}

export default handler