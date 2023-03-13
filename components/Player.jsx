'use client'
import { useEffect, useState, useRef } from 'react'
import { useRecoilState, useRecoilValue } from 'recoil';
import { currSongState, currStationState, isPlayingState, } from '../atoms/songAtom';
import {
  ArrowsRightLeftIcon,
  ArrowUturnLeftIcon,
  BackwardIcon,
  ForwardIcon,
  PauseCircleIcon,
  PlayCircleIcon,
} from "@heroicons/react/24/solid"
import ReactPlayer from 'react-player/youtube'
import { AudioAnimate } from '../lib/iconLibary'
import VolumeSlider from './VolumeSlider'
import { utilService } from '../services/util.service';





function Player() {

  const [song, setSong] = useRecoilState(currSongState)
  const station = useRecoilValue(currStationState)
  const [isPlaying, setIsPlaying] = useRecoilState(isPlayingState)
  const [hasWindow, setHasWindow] = useState(false);
  const [volumn, setVolumn] = useState(0.5)
  const player = useRef()
  const [duration, setDuration] = useState(0)
  const [songTimePlay, setSongTimePlay] = useState(0)
  const [seek, setSeek] = useState(0)
  const totalTime = player?.current?.getDuration()
  const [progColor, setProgColor] = useState('#ffffff')


  useEffect(() => {
    if (typeof window !== "undefined") {
      setHasWindow(true);
    }
  }, []);


  useEffect(() => {
    setDuration(player?.current?.getDuration())

  }, [song])



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

  function getSongTime(ev) {
    const timePlayed = ev.playedSeconds
    const totalTime = player?.current?.getDuration()
    const newDuration = totalTime - timePlayed
    setDuration(newDuration)
    setSongTimePlay(timePlayed)

  }

  const handleChangeTime = ({ target }) => {
    const { value } = target
    setSeek(value)
    player?.current?.seekTo(value)
  }
  function onToggleHover(ev) {
    if (ev.type === 'mousemove') setProgColor('#1ed760')
    else setProgColor('#ffffff')
  }
  function getPBStyle() {
    return songTimePlay / totalTime * 100
  }




  return (
    <div className=' flex justify-between h-24 mt-2 bg-[#181818]  border-t-transparent text-white md:grid grid-cols-3 text-xs md:text-base px-4 md:px-8'>
      <div className='flex items-center space-x-4'>
        <img src={song?.imgUrl} className='h-16 w-24 md:h-20 md:w-24' />
        <div>
          <h3 className='hidden md:inline text-sm'>{song?.title}</h3>
          <p className='text-xs' >{song?.channelTitle}</p>
          <div className={`opacity-0 ${isPlaying && 'opacity-100'}`}>
            <AudioAnimate />
          </div>

        </div>
      </div>
      <div className='flex flex-col justify-center'>

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
        <div className='flex items-center gap-2 w-full'>
          <p className='text-[#a7a7a7] text-xs'>{utilService.secondsToMinutesAndSeconds(songTimePlay)}</p>
          <input
            className='w-full player-progress'
            type="range"
            max={totalTime}
            min={0}
            step={1}
            onChange={handleChangeTime}
            value={songTimePlay}
            onMouseMove={onToggleHover}
            onMouseLeave={onToggleHover}
            style={{ background: `linear-gradient(to right, ${progColor} 0%, ${progColor} ${getPBStyle()}%, #b3b3b3 ${getPBStyle()}%, #b3b3b3 100%)` }}
          />
          <p className='text-[#a7a7a7] text-xs'>{utilService.secondsToMinutesAndSeconds(duration)}</p>

        </div>

      </div>
      <div className='hidden md:flex items-center space-x-3 md:space-x-4 justify-end pr-5'>
        <VolumeSlider onHandleChange={onHandleChange} volumn={volumn} />
      </div>

      {hasWindow && <div className='hidden'>
        <ReactPlayer
          url={`https://www.youtube.com/watch?v=${song.id}`}
          playing={isPlaying}
          volume={volumn}
          hidden
          ref={player}
          onProgress={getSongTime}
          onEnded={() => onChangeSong(1)}

        />
      </div>}

    </div>
  )
}

export default Player