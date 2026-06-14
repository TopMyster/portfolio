import { useState, useEffect } from 'react';
import pausedLight from '/assets/Music/paused-light.png';
import playLight from '/assets/Music/play-light.png';
import pausedDark from '/assets/Music/paused-dark.png';
import playDark from '/assets/Music/play-dark.png';

export default function MusicPlayer() {
  const [playing, setPlaying] = useState(false);
  const [isDark, setIsDark] = useState(false);
  const [audio, setAudio] = useState<HTMLAudioElement | null>(null);

  useEffect(() => {
    const music = new Audio('/assets/Music/Over the Horizon.mp3');
    music.loop = true
    setAudio(music);

    return () => {
      music.pause();
    };
  }, []);

  useEffect(() => {
    if (!audio) return;

    if (playing) {
      audio.play().catch((err) => console.log(err));
    } else {
      audio.pause();
    }
  }, [playing, audio]);

  useEffect(() => {
    let isDarkMode = window.matchMedia('(prefers-color-scheme: dark)').matches;
    setIsDark(isDarkMode)
  })

  return (
    <>
      <div className="music-container" style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
        <img 
          src={playing ? isDark ? playDark : playLight : isDark ? pausedDark : pausedLight} 
          width={17} 
          height={17} 
          style={{ cursor: 'pointer', margin: 0 }}
          onClick={() => setPlaying(!playing)} 
          alt={playing ? "Pause" : "Play"}
        />
        <h5 style={{fontWeight: 500}}>Over The Horizon</h5>
      </div>
    </>
  );
}