"use client";

import { useEffect, useRef, useState } from "react";

export default function AmbientAudio() {
    const audioRef = useRef<HTMLAudioElement | null>(null);
    const [enabled, setEnabled] = useState(false);
    const [mounted, setMounted] = useState(false);

    useEffect(() => {
        setMounted(true);

        const saved = window.localStorage.getItem("ambient-audio-enabled");
        if (saved === "true") {
            setEnabled(true);
        }
    }, []);

    useEffect(() => {
        if (!mounted || !audioRef.current) return;

        const audio = audioRef.current;
        audio.volume = 0.22;
        audio.loop = true;

        if (enabled) {
            audio
                .play()
                .catch(() => {
                    setEnabled(false);
                    window.localStorage.setItem("ambient-audio-enabled", "false");
                });
        } else {
            audio.pause();
            audio.currentTime = audio.currentTime;
        }

        window.localStorage.setItem(
            "ambient-audio-enabled",
            enabled ? "true" : "false"
        );
    }, [enabled, mounted]);

    const toggleAudio = async () => {
        if (!audioRef.current) return;

        if (enabled) {
            setEnabled(false);
            return;
        }

        try {
            await audioRef.current.play();
            setEnabled(true);
        } catch {
            setEnabled(false);
        }
    };

    return (
        <>
            <audio ref={audioRef} preload="auto">
                <source src="/ambient-nebula.mp3" type="audio/mpeg" />
                Your browser does not support the audio element.
            </audio>

            <button
                type="button"
                onClick={toggleAudio}
                aria-pressed={enabled}
                aria-label={enabled ? "Turn ambient sound off" : "Turn ambient sound on"}
                className="fixed bottom-5 right-5 z-[70] inline-flex items-center gap-2 rounded-full border border-white/10 bg-black/60 px-4 py-2 text-sm text-zinc-200 backdrop-blur-md transition-all duration-300 hover:border-zinc-400/60 hover:bg-black/75 hover:text-white"
            >
                <span
                    className={`inline-block h-2.5 w-2.5 rounded-full ${enabled ? "bg-emerald-400 shadow-[0_0_12px_rgba(74,222,128,0.8)]" : "bg-zinc-500"
                        }`}
                />
                {enabled ? "Sound On" : "Sound Off"}
            </button>
        </>
    );
}
