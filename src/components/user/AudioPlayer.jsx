import { useState } from 'react';
import { getTTSUrl } from '../../services/ttsService';

const AudioPlayer = ({ text }) => {
  const [play, setPlay] = useState(false);

  const playAudio = () => {
    setPlay(true);
  };

  return (
    <div className="mt-4 flex items-center gap-3">
      <button
        onClick={playAudio}
        className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
      >
        🔊 Play Audio
      </button>

      {play && (
        <audio controls autoPlay>
          <source
            src={`https://scan-go-frontend.onrender.com/api/tts?text=${encodeURIComponent(text)}`}
            type="audio/mpeg"
          />
          Your browser does not support audio playback.
        </audio>
      )}
    </div>
  );
};

export default AudioPlayer;
