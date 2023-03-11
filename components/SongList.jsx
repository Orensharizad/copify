import React from 'react'
import SongPreview from "./SongPreview";

function SongList({ station }) {
    return (
        <div className='text-white px-8 flex flex-col space-y-1 pb-60'>
            {station?.songs?.map((song, idx) =>
                <SongPreview key={song.id} song={song} order={idx} />
            )}
        </div>
    )
}

export default SongList