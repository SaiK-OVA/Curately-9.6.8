import React, { useEffect, useRef, useState } from "react";
import PauseIcon from '@mui/icons-material/Pause';
import PlayArrowOutlinedIcon from '@mui/icons-material/PlayArrowOutlined';
import './AudioPlayer.scss';
 
interface AudioPlayerProps {
  src: string; // URL or path to the .ogg file
  isPlaying: boolean;
  togglePlay: any
}
 
const AudioPlayer: React.FC<AudioPlayerProps> = ({ src, isPlaying, togglePlay }) => {
  const audioRef = useRef<HTMLAudioElement>(null);
  // const [isPlaying, setIsPlaying] = useState(false);
 
  // const togglePlay = () => {
  //   const audio = audioRef.current;
  //   if (!audio) return;
 
  //   if (isPlaying) {
  //     audio.pause();
  //   } else {
  //     audio.play();
  //   }
 
  //   setIsPlaying(!isPlaying);
  // };
 
  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;
 
    if (!isPlaying) {
      audio.pause();
      audio.currentTime = 0;
    } else {
      audio.play();
    }
  }, [isPlaying])
 
  return (
    <div id="AudioPlayer" className="activeButtonLink1">
      {isPlaying && <audio ref={audioRef} src={src} preload="auto" />}
      <button
        onClick={() => togglePlay(isPlaying)}
        className={isPlaying ? "activeButtonLink-pause" : "activeButtonLink-play"}
      >
        {isPlaying ? <PauseIcon className='mt-0' /> : <PlayArrowOutlinedIcon className='mt-0' />}
      </button>
      {/* <span className="text-gray-600 text-sm">Now Playing: {src}</span> */}
    </div>
  );
};
 
export default React.memo(AudioPlayer);