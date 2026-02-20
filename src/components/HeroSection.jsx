import { useRef } from 'react';

export default function HeroSection() {
    const dashboardRef = useRef(null);

    const handleMouseMove = (e) => {
        if (!dashboardRef.current) return;
        const rect = dashboardRef.current.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        dashboardRef.current.style.setProperty('--mouse-x', `${x}px`);
        dashboardRef.current.style.setProperty('--mouse-y', `${y}px`);
    };

    return (
        <section className="hero" id="hero">
            <div
                className="hero-dashboard"
                ref={dashboardRef}
                onMouseMove={handleMouseMove}
            >
                <p className="hero-subtitle">A Special Day Is Coming</p>
                <h1 className="hero-name">
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
                <p className="hero-date">09 · 03 · 2026</p>
                <p className="hero-age">Tahun- <span className="gold-text">26</span></p>
            </div>
        </section>
    );
}
