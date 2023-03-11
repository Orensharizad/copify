
'use client'

import { useRouter } from "next/navigation"
import { useState } from "react";
import { useRecoilState } from "recoil";
import { currSongState, currStationState, isPlayingState } from "../atoms/songAtom";

function StationPreview({ station }) {
    const router = useRouter()
    const [isHover, setIsHover] = useState(false)
    const [currStation, setCurrStation] = useRecoilState(currStationState)
    const [currSong, setCurrSong] = useRecoilState(currSongState)
    const [isPlaying, setIsPlaying] = useRecoilState(isPlayingState)





    const onNavigate = () => {
        setCurrStation(station)
        router.push(`/details/${station._id}`)
    }


    const onPlayStation = (ev, diff) => {
        ev.stopPropagation()
        setCurrStation(station)
        setIsPlaying(diff)
        setCurrSong(station.songs[0])

    }


    return (
        <section onClick={onNavigate} className="text-white    ">
            <div onMouseEnter={() => setIsHover(true)} onMouseLeave={() => setIsHover(false)} className="relative p-4 bg-[#3a3a3aa9] transition-all ease-in-out rounded-md flex flex-col gap-2 cursor-pointer hover:bg-[#4e4e4ea9] lg: max-w-[224px] h-80 ">
                <img className="min-w-48 min-h-48 shadow-2xl " src={station.imgUrl} />
                <h2 className="font-bold">{station.name}</h2>
                <p className="opacity-30">{station?.songs[0]?.title}</p>
                <div className={`h-12 w-12 absolute shadow-2xl  right-5 bottom-[115px] rounded-full flex items-center justify-center bg-[#1ed760] transition transform translate-y-0 ease-in-out opacity-0 ${(isHover || (station._id === currStation._id && isPlaying)) && 'opacity-100 '}  `}>
                    {station?._id === currStation?._id && isPlaying ?
                        <svg onClick={(ev) => onPlayStation(ev, false)} role="img" height="24" width="24" aria-hidden="true" viewBox="0 0 24 24" data-encore-id="icon" ><path d="M5.7 3a.7.7 0 00-.7.7v16.6a.7.7 0 00.7.7h2.6a.7.7 0 00.7-.7V3.7a.7.7 0 00-.7-.7H5.7zm10 0a.7.7 0 00-.7.7v16.6a.7.7 0 00.7.7h2.6a.7.7 0 00.7-.7V3.7a.7.7 0 00-.7-.7h-2.6z"></path></svg> : <svg
                            onClick={(ev) => onPlayStation(ev, true)} role="img" height="24" width="24" aria-hidden="true" viewBox="0 0 24 24" data-encore-id="icon" ><path d="M7.05 3.606l13.49 7.788a.7.7 0 010 1.212L7.05 20.394A.7.7 0 016 19.788V4.212a.7.7 0 011.05-.606z"></path></svg>}
                </div>
            </div>

        </section>
    )
}

export default StationPreview