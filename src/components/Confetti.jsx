import { useEffect, useRef } from 'react';

export default function Confetti() {
    const canvasRef = useRef(null);

    useEffect(() => {
        const canvas = canvasRef.current;
        const ctx = canvas.getContext('2d');
        let animId;
        let pieces = [];

        const resize = () => {
            canvas.width = window.innerWidth;
            canvas.height = window.innerHeight;
        };
        resize();
        window.addEventListener('resize', resize);

        const colors = [
            '#d4af37', '#f0d060', '#ffd700', '#b8941f',
            '#ff6b6b', '#ee5a24', '#f8c291',
            '#a29bfe', '#6c5ce7',
            '#ffffff', '#f5f5f5',
        ];

        class ConfettiPiece {
            constructor() {
                this.x = Math.random() * canvas.width;
                this.y = Math.random() * -canvas.height;
                this.w = Math.random() * 8 + 4;
                this.h = Math.random() * 4 + 2;
                this.color = colors[Math.floor(Math.random() * colors.length)];
                this.speedY = Math.random() * 3 + 1.5;
                this.speedX = (Math.random() - 0.5) * 2;
                this.rotation = Math.random() * 360;
                this.rotationSpeed = (Math.random() - 0.5) * 10;
                this.opacity = Math.random() * 0.7 + 0.3;
                this.wobble = Math.random() * 10;
                this.wobbleSpeed = Math.random() * 0.1 + 0.03;
            }

            update() {
                this.y += this.speedY;
                this.x += this.speedX + Math.sin(this.wobble) * 0.5;
                this.rotation += this.rotationSpeed;
                this.wobble += this.wobbleSpeed;

                if (this.y > canvas.height + 20) {
                    this.y = -20;
                    this.x = Math.random() * canvas.width;
                }
            }

            draw() {
                ctx.save();
                ctx.translate(this.x, this.y);
                ctx.rotate((this.rotation * Math.PI) / 180);
                ctx.globalAlpha = this.opacity;
                ctx.fillStyle = this.color;
                ctx.fillRect(-this.w / 2, -this.h / 2, this.w, this.h);
                ctx.restore();
            }
        }

        // Create confetti
        for (let i = 0; i < 120; i++) {
            pieces.push(new ConfettiPiece());
        }

        const animate = () => {
            ctx.clearRect(0, 0, canvas.width, canvas.height);
            pieces.forEach(p => {
                p.update();
                p.draw();
            });
            animId = requestAnimationFrame(animate);
        };

        animate();

        // Stop confetti after 8 seconds
        const stopTimer = setTimeout(() => {
            cancelAnimationFrame(animId);
            ctx.clearRect(0, 0, canvas.width, canvas.height);
        }, 8000);

        return () => {
            cancelAnimationFrame(animId);
            clearTimeout(stopTimer);
            window.removeEventListener('resize', resize);
        };
    }, []);

    return (
        <canvas
            ref={canvasRef}
            style={{
                position: 'fixed',
                top: 0,
                left: 0,
                width: '100%',
                height: '100%',
                zIndex: 100,
                pointerEvents: 'none',
            }}
        />
    );
}
