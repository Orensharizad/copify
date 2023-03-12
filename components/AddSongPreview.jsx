import React from 'react'

function AddSongPreview({ song, searchVal, onAddSong }) {
    return (
        <div className='flex items-center justify-between py-1 px-2 mb-1 hover:bg-[#3a3a3aa9] rounded-lg cursor-pointer'>
            <div className='flex items-center gap-3'>
                <img src={song?.imgUrl} className='w-16 h-16' />
                <div className='flex flex-col'>
                    <p>{searchVal}</p>
                    <p>{song.title}</p>
                </div>
            </div>
            <button onClick={() => onAddSong(song)} className='py-2 px-5 border border-gray-500 rounded-3xl hover:scale-105 hover:border-white'>Add</button>
        </div>
    )
}

export default AddSongPreview