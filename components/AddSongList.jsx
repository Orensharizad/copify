import React from 'react'
import AddSongPreview from './AddSongPreview'

function AddSongList({ songs, searchVal, onAddSong }) {
    return (
        <div className='pt-3'>
            {songs?.map(song =>
                <AddSongPreview key={song.id} song={song} searchVal={searchVal} onAddSong={onAddSong} />
            )}

        </div>
    )
}

export default AddSongList