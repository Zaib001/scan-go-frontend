// ttsService.js
export const getTTSUrl = async (text) => {
  const res = await fetch(`https://scan-go-backend.onrender.com/api/tts?text=${encodeURIComponent(text)}`);
  return await res.json();
};
