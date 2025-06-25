// ttsService.js
export const getTTSUrl = async (text) => {
  const res = await fetch(`http://localhost:5000/api/tts?text=${encodeURIComponent(text)}`);
  return await res.json();
};
