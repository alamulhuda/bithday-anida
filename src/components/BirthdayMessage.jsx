import MusicPlaylist from './MusicPlaylist';

export default function BirthdayMessage() {
    return (
        <section className="message-section">
            <div className="message-content-wrapper">
                <div className="message-text-side">
                    <div className="message-icon visible">🎂</div>
                    <h2 className="message-heading visible">
                        <span className="gold-text">Happy Birthday,</span>
                        <br />
                        Anida!
                    </h2>
                    <p className="message-body visible">
                        Di hari spesialmu ini, semoga semua impian dan harapanmu
                        menjadi kenyataan. Kamu layak mendapatkan semua kebahagiaan
                        yang ada di dunia ini. Terima kasih sudah menjadi seseorang
                        yang luar biasa istimewa. Selamat ulang tahun, sayang! 💛
                    </p>
                    <p className="message-signature visible">
                        — With love, Him ♥
                    </p>
                </div>
                {/* <div className="message-music-side">
                    <MusicPlaylist />
                </div> */}
            </div>
        </section>
    );
}
