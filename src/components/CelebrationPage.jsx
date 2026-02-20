import { useState, useEffect, useRef, useCallback } from 'react';
import HeroSection from './HeroSection';
import BirthdayMessage from './BirthdayMessage';
import WishesSection from './WishesSection';
import Footer from './Footer';
import Confetti from './Confetti';

// Happy Birthday melody notes (frequency, duration)
const HAPPY_BIRTHDAY_NOTES = [
    // Hap-py Birth-day to you
    [262, 0.3], [262, 0.15], [294, 0.45], [262, 0.45], [349, 0.45], [330, 0.9],
    // Hap-py Birth-day to you
    [262, 0.3], [262, 0.15], [294, 0.45], [262, 0.45], [392, 0.45], [349, 0.9],
    // Hap-py Birth-day dear Wuwuh
    [262, 0.3], [262, 0.15], [523, 0.45], [440, 0.45], [349, 0.45], [330, 0.45], [294, 0.9],
    // Hap-py Birth-day to you
    [466, 0.3], [466, 0.15], [440, 0.45], [349, 0.45], [392, 0.45], [349, 0.9],
];

function playHappyBirthday(audioCtx) {
    const gainNode = audioCtx.createGain();
    gainNode.gain.value = 0.15;
    gainNode.connect(audioCtx.destination);

    let time = audioCtx.currentTime + 0.5;

    HAPPY_BIRTHDAY_NOTES.forEach(([freq, dur]) => {
        const osc = audioCtx.createOscillator();
        const noteGain = audioCtx.createGain();

        osc.type = 'sine';
        osc.frequency.value = freq;

        // Envelope for natural sound
        noteGain.gain.setValueAtTime(0, time);
        noteGain.gain.linearRampToValueAtTime(0.4, time + 0.05);
        noteGain.gain.exponentialRampToValueAtTime(0.01, time + dur - 0.05);

        osc.connect(noteGain);
        noteGain.connect(gainNode);

        osc.start(time);
        osc.stop(time + dur);
        time += dur;
    });

    return time - audioCtx.currentTime;
}

export default function CelebrationPage() {
    const [entered, setEntered] = useState(false);
    const [musicPlaying, setMusicPlaying] = useState(false);
    const audioCtxRef = useRef(null);

    const handleEnter = useCallback(() => {
        setEntered(true);

        // Play music
        try {
            const ctx = new (window.AudioContext || window.webkitAudioContext)();
            audioCtxRef.current = ctx;
            playHappyBirthday(ctx);
            setMusicPlaying(true);

            // Loop the melody
            const totalDuration = HAPPY_BIRTHDAY_NOTES.reduce((sum, [, d]) => sum + d, 0) + 0.5;
            const loopInterval = setInterval(() => {
                if (audioCtxRef.current && audioCtxRef.current.state === 'running') {
                    playHappyBirthday(audioCtxRef.current);
                }
            }, totalDuration * 1000 + 500);

            // Stop after 3 loops
            setTimeout(() => {
                clearInterval(loopInterval);
                setMusicPlaying(false);
            }, totalDuration * 3 * 1000 + 2000);
        } catch (e) {
            console.log('Audio not supported');
        }
    }, []);

    const toggleMusic = useCallback(() => {
        if (!audioCtxRef.current) return;

        if (musicPlaying) {
            audioCtxRef.current.suspend();
            setMusicPlaying(false);
        } else {
            audioCtxRef.current.resume();
            playHappyBirthday(audioCtxRef.current);
            setMusicPlaying(true);
        }
    }, [musicPlaying]);

    // Gate screen — "Open your surprise!"
    if (!entered) {
        return (
            <div className="gate-screen">
                <div className="gate-content">
                    <div className="gate-emoji">🎁</div>
                    <h1 className="gate-title">
                        <span className="gold-text">Selamat!</span>
                    </h1>
                    <p className="gate-subtitle">Ada kejutan spesial untukmu...</p>
                    <button className="gate-button" onClick={handleEnter}>
                        <span>Buka Kejutan</span>
                        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                            <path d="M5 12h14" />
                            <path d="m12 5 7 7-7 7" />
                        </svg>
                    </button>
                </div>
            </div>
        );
    }

    return (
        <div className="celebration-page">
            <Confetti />

            {/* Music toggle button */}
            <button className="music-toggle" onClick={toggleMusic} title={musicPlaying ? 'Matikan Musik' : 'Putar Musik'}>
                {musicPlaying ? '🔊' : '🔇'}
            </button>

            <HeroSection />
            <BirthdayMessage />
            <WishesSection />
            <Footer />
        </div>
    );
}
