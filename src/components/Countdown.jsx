import { useState, useEffect, useRef } from 'react';

const BIRTHDAY = new Date('2026-03-09T00:00:00+07:00');

function getTimeLeft() {
    const now = new Date();
    const diff = BIRTHDAY - now;

    if (diff <= 0) {
        return { days: 0, hours: 0, minutes: 0, seconds: 0, isOver: true };
    }

    return {
        days: Math.floor(diff / (1000 * 60 * 60 * 24)),
        hours: Math.floor((diff / (1000 * 60 * 60)) % 24),
        minutes: Math.floor((diff / (1000 * 60)) % 60),
        seconds: Math.floor((diff / 1000) % 60),
        isOver: false,
    };
}

function CountdownUnit({ value, label, delay }) {
    const [displayValue, setDisplayValue] = useState(value);
    const [flipping, setFlipping] = useState(false);
    const prevValue = useRef(value);

    useEffect(() => {
        if (prevValue.current !== value) {
            setFlipping(true);
            const timeout = setTimeout(() => {
                setDisplayValue(value);
                setFlipping(false);
            }, 300);
            prevValue.current = value;
            return () => clearTimeout(timeout);
        }
    }, [value]);

    return (
        <div
            className="countdown-item"
            style={{ animationDelay: `${delay}s` }}
        >
            <span className={`countdown-value ${flipping ? 'flip' : ''}`}>
                {String(displayValue).padStart(2, '0')}
            </span>
            <span className="countdown-label">{label}</span>
        </div>
    );
}

export default function Countdown() {
    const [timeLeft, setTimeLeft] = useState(getTimeLeft);
    const sectionRef = useRef(null);
    const [isVisible, setIsVisible] = useState(false);

    useEffect(() => {
        const timer = setInterval(() => {
            setTimeLeft(getTimeLeft());
        }, 1000);

        return () => clearInterval(timer);
    }, []);

    useEffect(() => {
        const observer = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting) setIsVisible(true);
            },
            { threshold: 0.2 }
        );

        if (sectionRef.current) observer.observe(sectionRef.current);
        return () => observer.disconnect();
    }, []);

    if (timeLeft.isOver) {
        return (
            <section className="countdown-section" ref={sectionRef}>
                <p className="section-label">🎉 Hari Ini!</p>
                <h2 className="section-title">
                    Selamat Ulang Tahun!
                </h2>
            </section>
        );
    }

    return (
        <section
            className={`countdown-section reveal ${isVisible ? 'visible' : ''}`}
            ref={sectionRef}
        >
            <p className="section-label">✦ Menuju Hari Spesial ✦</p>
            <h2 className="section-title">Countdown</h2>
            <div className="countdown-grid">
                <CountdownUnit value={timeLeft.days} label="Hari" delay={0} />
                <CountdownUnit value={timeLeft.hours} label="Jam" delay={0.1} />
                <CountdownUnit value={timeLeft.minutes} label="Menit" delay={0.2} />
                <CountdownUnit value={timeLeft.seconds} label="Detik" delay={0.3} />
            </div>
        </section>
    );
}
