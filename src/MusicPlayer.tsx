import { useState, useEffect } from 'react';
import pausedLight from '/assets/Music/paused-light.png';
import playLight from '/assets/Music/play-light.png';
import pausedDark from '/assets/Music/paused-dark.png';
import playDark from '/assets/Music/play-dark.png';

export default function MusicPlayer() {
  const [playing, setPlaying] = useState(false);
  const [isDark, setIsDark] = useState(false);
  const [audio, setAudio] = useState<HTMLAudioElement | null>(null);
  const buttonIcon = playing
    ? isDark ? pausedDark : pausedLight
    : isDark ? playDark : playLight;

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
    const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
    const updateTheme = (event: MediaQueryList | MediaQueryListEvent) => {
      setIsDark(event.matches);
    };

    updateTheme(mediaQuery);
    mediaQuery.addEventListener('change', updateTheme);

    return () => {
      mediaQuery.removeEventListener('change', updateTheme);
    };
  }, [])

  return (
    <>
      <div className="music-container" style={{ display: 'flex', alignItems: 'center', gap: '8px', cursor: 'pointer' }} onClick={() => setPlaying((current) => !current)} >
        <img 
          src={buttonIcon} 
          width={17} 
          height={17} 
          style={{ cursor: 'pointer', margin: 0 }}
          alt={playing ? "Pause" : "Play"}
        />
        <h5 style={{fontWeight: 500}}>Over The Horizon</h5>
      </div>
    </>
  );
}
