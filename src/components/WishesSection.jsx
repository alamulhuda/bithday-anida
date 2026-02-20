import { useEffect, useRef, useState } from 'react';

const wishes = [
    {
        icon: '🌟',
        title: 'Bahagia Selalu',
        text: 'Semoga hidupmu selalu dipenuhi tawa, senyum, dan kebahagiaan tanpa batas.',
    },
    {
        icon: '💪',
        title: 'Sehat & Kuat',
        text: 'Semoga diberikan kesehatan yang prima untuk menjalani setiap petualangan baru.',
    },
    {
        icon: '🚀',
        title: 'Sukses Besar',
        text: 'Semoga segala cita-cita dan impianmu tercapai satu per satu. Kamu pasti bisa!',
    },
    {
        icon: '💖',
        title: 'Penuh Cinta',
        text: 'Semoga selalu dikelilingi orang-orang yang menyayangimu tulus dan sepenuh hati.',
    },
];

export default function WishesSection() {
    const sectionRef = useRef(null);
    const [isVisible, setIsVisible] = useState(false);

    useEffect(() => {
        const observer = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting) setIsVisible(true);
            },
            { threshold: 0.15 }
        );

        if (sectionRef.current) observer.observe(sectionRef.current);
        return () => observer.disconnect();
    }, []);

    return (
        <section className="wishes-section" ref={sectionRef}>
            <p className="section-label">✦ Doa & Harapan ✦</p>
            <h2 className="section-title" style={{ marginBottom: '3rem' }}>
                Wishes For You
            </h2>
            <div className="wishes-grid">
                {wishes.map((wish, i) => (
                    <div
                        key={i}
                        className={`wish-card ${isVisible ? 'visible' : ''}`}
                        style={{ transitionDelay: `${i * 0.15}s` }}
                    >
                        <div className="wish-icon">{wish.icon}</div>
                        <h3 className="wish-title">{wish.title}</h3>
                        <p className="wish-text">{wish.text}</p>
                    </div>
                ))}
            </div>
        </section>
    );
}
