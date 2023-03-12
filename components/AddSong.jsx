'use client'

import { MagnifyingGlassIcon } from "@heroicons/react/24/solid"
import { useRef, useState } from "react"
import { utilService } from "../services/util.service"
import { YoutubeService } from "../services/youtube.service"
import AddSongList from "./AddSongList"



function AddSong({ onAddSong }) {

    const [songs, setSongs] = useState([])
    const [searchVal, setSearchVal] = useState('')
    const searchSongs = useRef(utilService.debounce(getSearchReasults, 700))

    const handleChange = ({ target }) => {
        const { value } = target
        searchSongs.current(value)
    }

    async function getSearchReasults(val) {
        try {
            const results = await YoutubeService.getYoutubeReasults(val)
            setSongs(results)
            setSearchVal(val)
        } catch (err) {
            console.log('cannot find songs:', err)
        }
    }

    return (
        <div className="pb-60 text-white pt-8 px-4 ">
            <h3 className="text-xl font-bold mb-5">Let's find something for your playlist</h3>
            <div className="flex items-center gap-2 bg-[#2c2c2c] max-w-[250px] px-1 rounded outline-none">
                <MagnifyingGlassIcon className="h-6 w-6" />
                <input
                    className='bg-[#2c2c2c] py-[10px] px-[15px] outline-none'
                    type="text"
                    placeholder='Search for Songs'
                    onChange={handleChange}
                />
            </div>

            {songs && <AddSongList onAddSong={onAddSong} searchVal={searchVal} songs={songs} />}
        </div>
    )
}

export default AddSong