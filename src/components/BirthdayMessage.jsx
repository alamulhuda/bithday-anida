import { useEffect, useRef, useState } from 'react';

export default function BirthdayMessage() {
    const sectionRef = useRef(null);
    const [isVisible, setIsVisible] = useState(false);

    useEffect(() => {
        const observer = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting) setIsVisible(true);
            },
            { threshold: 0.3 }
        );

        if (sectionRef.current) observer.observe(sectionRef.current);
        return () => observer.disconnect();
    }, []);

    return (
        <section className="message-section" ref={sectionRef}>
            <div className={`message-icon ${isVisible ? 'visible' : ''}`}>🎂</div>
            <h2 className={`message-heading ${isVisible ? 'visible' : ''}`}>
                <span className="gold-text">Happy Birthday,</span>
                <br />
                Wuwuh!
            </h2>
            <p className={`message-body ${isVisible ? 'visible' : ''}`}>
                Di hari spesialmu ini, semoga semua impian dan harapanmu
                menjadi kenyataan. Kamu layak mendapatkan semua kebahagiaan
                yang ada di dunia ini. Terima kasih sudah menjadi seseorang
                yang luar biasa istimewa. Selamat ulang tahun, sayang! 💛
            </p>
            <p className={`message-signature ${isVisible ? 'visible' : ''}`}>
                —From, Him ♥
            </p>
        </section>
    );
}
