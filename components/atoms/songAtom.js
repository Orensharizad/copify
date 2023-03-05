import { atom } from "recoil";

export const currTrackIdState = atom({
    key: 'currTrackIdState',
    default: null
})


export const isPlayingState = atom({
    key: 'isPlayingState',
    default: false
})