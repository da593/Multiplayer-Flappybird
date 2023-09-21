import { AudioCue } from "@flappyblock/shared";
import { useEffect, useState } from "react";

export function useAudio(type: AudioCue): HTMLAudioElement | null {
    const [audio, setAudio] = useState<HTMLAudioElement | null>(null);

    useEffect(() => {
        const enum extensions {
            ogg = ".ogg",
            wav = ".wav"
        }
        const path = "/static/audio/";
        const oggPath = path + type + extensions.ogg;
        const wavPath = path + type + extensions.wav;
        const oggAudio = new Audio(oggPath);
        const wavAudio = new Audio(wavPath);
        if (oggAudio?.canPlayType("audio/ogg")) {
            setAudio(oggAudio);
        }
        else if (wavAudio?.canPlayType("audio/wav")) {
            setAudio(wavAudio);
        }
    }, [])


    return audio;
}