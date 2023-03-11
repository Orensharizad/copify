

export const songService = {
    query,
    getById,


}

async function query() {
    const res = await fetch('/api/song')
    return res.json()
}


async function getById(songId) {
    try {
        const res = await fetch(`/api/song/${songId}`)
        return res.json()

    } catch (err) {
        console.log('err from service:', err)
    }
}