import { useState, useEffect, useRef } from 'react';

function getTimeLeft(targetDate) {
    const now = new Date();
    const diff = targetDate - now;

    if (diff <= 0) {
        return { days: 0, hours: 0, minutes: 0, seconds: 0 };
    }

    return {
        days: Math.floor(diff / (1000 * 60 * 60 * 24)),
        hours: Math.floor((diff / (1000 * 60 * 60)) % 24),
        minutes: Math.floor((diff / (1000 * 60)) % 60),
        seconds: Math.floor((diff / 1000) % 60),
    };
}

function CountdownUnit({ value, label }) {
    const [prev, setPrev] = useState(value);
    const [flipping, setFlipping] = useState(false);

    useEffect(() => {
        if (prev !== value) {
            setFlipping(true);
            const t = setTimeout(() => {
                setPrev(value);
                setFlipping(false);
            }, 300);
            return () => clearTimeout(t);
        }
    }, [value, prev]);

    return (
        <div className="countdown-item">
            <span className={`countdown-value ${flipping ? 'flip' : ''}`}>
                {String(prev).padStart(2, '0')}
            </span>
            <span className="countdown-label">{label}</span>
        </div>
    );
}

export default function CountdownPage({ targetDate }) {
    const [timeLeft, setTimeLeft] = useState(() => getTimeLeft(targetDate));
    const pageRef = useRef(null);

    useEffect(() => {
        const timer = setInterval(() => {
            setTimeLeft(getTimeLeft(targetDate));
        }, 1000);
        return () => clearInterval(timer);
    }, [targetDate]);

    const handleMouseMove = (e) => {
        if (!pageRef.current) return;
        const rect = pageRef.current.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        pageRef.current.style.setProperty('--mouse-x', `${x}px`);
        pageRef.current.style.setProperty('--mouse-y', `${y}px`);
    };

    return (
        <div
            className="countdown-page"
            ref={pageRef}
            onMouseMove={handleMouseMove}
        >
            <div className="countdown-page-inner">
                {/* Lock Icon */}
                <div className="lock-icon">
                    <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                        <rect x="3" y="11" width="18" height="11" rx="2" ry="2" />
                        <path d="M7 11V7a5 5 0 0 1 10 0v4" />
                    </svg>
                </div>

                <p className="countdown-page-subtitle">A Special Day Is Coming For</p>
                <h1 className="countdown-page-name">
                    {'Wuwuh Anida Arifah'.split('').map((char, i) => (
                        <span
                            key={i}
                            className={`name-letter ${char === ' ' ? 'name-space' : ''}`}
                            style={{ animationDelay: `${0.8 + i * 0.05}s` }}
                        >
                            {char === ' ' ? '\u00A0' : char}
                        </span>
                    ))}
                </h1>
                <div className="hero-divider" />

                {/* Countdown */}
                <div className="countdown-grid">
                    <CountdownUnit value={timeLeft.days} label="Hari" />
                    <CountdownUnit value={timeLeft.hours} label="Jam" />
                    <CountdownUnit value={timeLeft.minutes} label="Menit" />
                    <CountdownUnit value={timeLeft.seconds} label="Detik" />
                </div>

                <p className="countdown-page-hint">
                    🔒 Tunggu sampai waktunya tiba...
                </p>
            </div>
        </div>
    );
}
