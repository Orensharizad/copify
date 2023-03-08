'use client'
import { useRouter } from "next/navigation"
import { useState } from 'react'
import { useRecoilState } from "recoil"
import { currSongState, currStationState, isPlayingState } from "../atoms/songAtom"

function FirstStationPreview({ station }) {
    const [isHover, setIsHover] = useState(false)
    const [currStation, setCurrStation] = useRecoilState(currStationState)
    const [currSong, setCurrSong] = useRecoilState(currSongState)
    const [isPlaying, setIsPlaying] = useRecoilState(isPlayingState)

    const router = useRouter()

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
        <div onClick={onNavigate} onMouseEnter={() => setIsHover(true)} onMouseLeave={() => setIsHover(false)} className='bg-[#2c2c2c] flex items-center justify-between font-bold  text-white max-h-[5rem] relative cursor-pointer text-xs md:text-sm '>
            <div className='flex items-center gap-3' >
                <img className=' h-16 w-16 ' src={station.imgUrl} alt="" />
                <p>{station.name}</p>
            </div>


            <div className={` h-12 w-12  shadow-2xl mr-2  rounded-full flex items-center justify-center bg-[#1ed760] transition transform translate-y-0 ease-in-out opacity-0
            ${(isHover || (station._id === currStation._id && isPlaying)) && 'opacity-100 '}  `}>
                {station?._id === currStation?._id && isPlaying ?
                    <svg onClick={(ev) => onPlayStation(ev, false)} role="img" height="24" width="24" aria-hidden="true" viewBox="0 0 24 24" data-encore-id="icon" ><path d="M5.7 3a.7.7 0 00-.7.7v16.6a.7.7 0 00.7.7h2.6a.7.7 0 00.7-.7V3.7a.7.7 0 00-.7-.7H5.7zm10 0a.7.7 0 00-.7.7v16.6a.7.7 0 00.7.7h2.6a.7.7 0 00.7-.7V3.7a.7.7 0 00-.7-.7h-2.6z"></path></svg> : <svg
                        onClick={(ev) => onPlayStation(ev, true)} role="img" height="24" width="24" aria-hidden="true" viewBox="0 0 24 24" data-encore-id="icon" ><path d="M7.05 3.606l13.49 7.788a.7.7 0 010 1.212L7.05 20.394A.7.7 0 016 19.788V4.212a.7.7 0 011.05-.606z"></path></svg>}
            </div>
        </div>
    )
}

export default FirstStationPreview