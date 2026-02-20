import { useEffect, useRef } from 'react';

export default function GoldParticles() {
    const canvasRef = useRef(null);

    useEffect(() => {
        const canvas = canvasRef.current;
        const ctx = canvas.getContext('2d');
        let animationId;
        let particles = [];

        const resize = () => {
            canvas.width = window.innerWidth;
            canvas.height = window.innerHeight;
        };

        resize();
        window.addEventListener('resize', resize);

        class Particle {
            constructor() {
                this.reset();
            }

            reset() {
                this.x = Math.random() * canvas.width;
                this.y = Math.random() * canvas.height;
                this.size = Math.random() * 2.5 + 0.5;
                this.speedX = (Math.random() - 0.5) * 0.4;
                this.speedY = Math.random() * -0.6 - 0.1;
                this.opacity = Math.random() * 0.5 + 0.1;
                this.fadeSpeed = Math.random() * 0.003 + 0.001;
                this.growing = Math.random() > 0.5;
                this.shimmerPhase = Math.random() * Math.PI * 2;
                this.shimmerSpeed = Math.random() * 0.02 + 0.01;

                // Gold color variations
                const goldVariant = Math.random();
                if (goldVariant < 0.3) {
                    this.color = { r: 212, g: 175, b: 55 };  // Classic gold
                } else if (goldVariant < 0.6) {
                    this.color = { r: 240, g: 208, b: 96 };   // Light gold
                } else if (goldVariant < 0.85) {
                    this.color = { r: 255, g: 215, b: 0 };    // Bright gold
                } else {
                    this.color = { r: 184, g: 148, b: 31 };   // Dim gold
                }
            }

            update() {
                this.x += this.speedX;
                this.y += this.speedY;
                this.shimmerPhase += this.shimmerSpeed;

                const shimmer = Math.sin(this.shimmerPhase) * 0.15;
                this.currentOpacity = Math.max(0, this.opacity + shimmer);

                if (this.growing) {
                    this.opacity += this.fadeSpeed;
                    if (this.opacity >= 0.6) this.growing = false;
                } else {
                    this.opacity -= this.fadeSpeed;
                    if (this.opacity <= 0) this.reset();
                }

                // Reset if out of bounds
                if (this.y < -10 || this.x < -10 || this.x > canvas.width + 10) {
                    this.reset();
                    this.y = canvas.height + 10;
                }
            }

            draw() {
                ctx.beginPath();
                ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
                ctx.fillStyle = `rgba(${this.color.r}, ${this.color.g}, ${this.color.b}, ${this.currentOpacity})`;
                ctx.fill();

                // Glow effect
                if (this.size > 1.5) {
                    ctx.beginPath();
                    ctx.arc(this.x, this.y, this.size * 2.5, 0, Math.PI * 2);
                    ctx.fillStyle = `rgba(${this.color.r}, ${this.color.g}, ${this.color.b}, ${this.currentOpacity * 0.1})`;
                    ctx.fill();
                }
            }
        }

        // Create particles - more on desktop, fewer on mobile
        const count = window.innerWidth < 768 ? 40 : 80;
        for (let i = 0; i < count; i++) {
            particles.push(new Particle());
        }

        const animate = () => {
            ctx.clearRect(0, 0, canvas.width, canvas.height);

            particles.forEach(p => {
                p.update();
                p.draw();
            });

            animationId = requestAnimationFrame(animate);
        };

        animate();

        return () => {
            cancelAnimationFrame(animationId);
            window.removeEventListener('resize', resize);
        };
    }, []);

    return <canvas ref={canvasRef} className="particles-canvas" />;
}
