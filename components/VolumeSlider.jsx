'use client'
import { useState } from "react";
import { SpeakerWaveIcon, SpeakerXMarkIcon } from "@heroicons/react/24/solid"


export default function VolumeSlider({ onHandleChange, volumn }) {
    const [volumeColor, setVolumeColor] = useState('#ffffff')

    function onToggleHover(ev) {
        if (ev.type === 'mousemove') setVolumeColor('#1ed760')
        else setVolumeColor('#ffffff')
    }

    return (
        <>
            {volumn !== '0' ? <SpeakerWaveIcon className="w-5 h-5" /> : <SpeakerXMarkIcon className="w-5 h-5" />}
            <input
                type="range"
                className="volume-range w-full"
                onChange={onHandleChange}
                value={volumn}
                min={0}
                max={1}
                step={0.1}
                onMouseMove={onToggleHover}
                onMouseLeave={onToggleHover}
                style={{ background: `linear-gradient(to right, ${volumeColor} 0%, ${volumeColor} ${volumn}%, #b3b3b3 ${volumn}%, #b3b3b3 100%)` }}


            />
        </>

    );
}