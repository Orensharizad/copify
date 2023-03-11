'use client'
import { useEffect, useState } from 'react'
import { useRecoilState, useRecoilValue } from 'recoil';
import { currSongState, currStationState, isPlayingState, playerState } from '../atoms/songAtom';
import { HeartIcon, SpeakerWaveIcon, } from "@heroicons/react/24/outline";
import {
  ArrowsRightLeftIcon,
  ArrowUturnLeftIcon,
  BackwardIcon,
  ForwardIcon,
  PauseCircleIcon,
  PlayCircleIcon,
} from "@heroicons/react/24/solid"
import ReactPlayer from 'react-player/youtube'





function Player() {

  const [song, setSong] = useRecoilState(currSongState)
  const station = useRecoilValue(currStationState)
  const [isPlaying, setIsPlaying] = useRecoilState(isPlayingState)
  const [hasWindow, setHasWindow] = useState(false);
  const [volumn, setVolumn] = useState(0.5)

  useEffect(() => {
    if (typeof window !== "undefined") {
      setHasWindow(true);
    }
  }, []);

  const onPlayPause = (type) => {
    setIsPlaying(type)
  }

  const onChangeSong = (diff) => {
    if (!station) return
    const currSongIdx = station.songs.findIndex(s => s.title === song.title)
    if (diff === 1 && currSongIdx >= station.songs.length - 1) return
    if (diff === -1 && currSongIdx === 0) return
    const songs = [...station.songs]
    setSong(songs[currSongIdx + diff])

  }

  const onHandleChange = ({ target }) => {
    const value = target.value
    setVolumn(value)
  }

  const onChangeVol = (diff) => {
    if (diff === -0.1 && volumn <= 0) return
    if (diff === 0.1 && volumn >= 1) return
    setVolumn(prev => prev + diff)
  }


  return (
    <div className=' flex justify-between h-24 bg-[#181818]  border-t-transparent text-white md:grid grid-cols-3 text-xs md:text-base px-4 md:px-8'>
      <div className='flex items-center space-x-4'>
        <img src={song?.imgUrl} className='h-16 w-24 md:h-20 md:w-24' />
        <div>
          <h3 className='hidden md:inline'>{song?.title}</h3>
          <p  >{song?.channelTitle}</p>
        </div>
      </div>
      <div className='gap-2 flex items-center justify-evenly'>
        <ArrowsRightLeftIcon className='btn-control' />
        <BackwardIcon onClick={() => onChangeSong(-1)} className='btn-control' />

        {isPlaying ? (
          <PauseCircleIcon onClick={() => onPlayPause(false)} className='btn-control w-10 h-10' />
        ) : (
          <PlayCircleIcon onClick={() => onPlayPause(true)} className='btn-control w-10 h-10' />
        )}

        <ForwardIcon onClick={() => onChangeSong(1)} className='btn-control' />
        <ArrowUturnLeftIcon className='btn-control' />


      </div>

      <div className='hidden md:flex items-center space-x-3 md:space-x-4 justify-end pr-5'>
        <SpeakerWaveIcon onClick={() => onChangeVol(-0.1)} className='btn-control' />
        <input
          className='w-14 md:w-28 '
          type="range"
          min={0}
          max={1}
          step='0.1'
          value={volumn}
          onChange={onHandleChange}
        />
        <SpeakerWaveIcon onClick={() => onChangeVol(0.1)} className='btn-control' />
      </div>

      {hasWindow && <div className='hidden'>
        <ReactPlayer
          url={`https://www.youtube.com/watch?v=${song.id}`}
          playing={isPlaying}
          volume={volumn}
          hidden
        />
      </div>}

    </div>
  )
}

export default Player