'use client';

import { useState, useRef } from 'react';
import { motion } from 'framer-motion';
import localFont from 'next/font/local';

const gothic = localFont({
  src: '/Lucida Blackletter Regular.ttf',
  display: 'swap'
});

type Entry = {
  id: number;
  nickname: string;
  message: string;
  flower: {
    name: string;
    emoji: string;
  };
};

type Flame = {
  id: number;
  left: number;
  size: number;
};

const flowers = [
  { name: 'Normal Flower', emoji: '🌼' },
  { name: 'Hellfire', emoji: '🔥' },
];

const quotes = [
  '“The more chaotic, the better.” – Geordie Greep',
  '“Phoebe Bridgers is Black Country New Road for lesbians with stomach problems instead of english guys with moustache problems”',
  '“호날두 병신 한국 이겨라 싯팔”',
  '“호날두 🖕🖕🖕 김민재 😍😍😍”',
  '“Lula’s first act as president should be to bring black midi to Brazil 2023”',
  '“풀햄 짱 설기현 짱 한국 짱”',
];

const randomTributes = [
  '“The more chaotic, the better.” – Geordie Greep',
  '“Phoebe Bridgers is Black Country New Road for lesbians with stomach problems instead of english guys with moustache problems”',
  '“호날두 병신 한국 이겨라 싯팔”',
  '“호날두 🖕🖕🖕 김민재 😍😍😍”',
  '“Lula’s first act as president should be to bring black midi to Brazil 2023”',
  '“풀햄 짱 설기현 짱 한국 짱”',
];

export default function MemorialGuestbook() {
  const [nickname, setNickname] = useState('');
  const [message, setMessage] = useState('');
  const [selectedFlower, setSelectedFlower] = useState(flowers[0]);
  const [entries, setEntries] = useState<Entry[]>([]);
  const [flames, setFlames] = useState<Flame[]>([]);
  const [audioPlaying, setAudioPlaying] = useState(false);
  const audioRef = useRef<HTMLAudioElement>(null);

  const triggerFlame = (count: number = 1) => {
    const newFlames: Flame[] = Array.from({ length: count }).map(() => {
      const id = Date.now() + Math.random();
      const left = Math.random() * 80 + 10;
      const size = Math.random() * 20 + 20;
      return { id, left, size };
    });
    setFlames((prev) => [...prev, ...newFlames]);
    setTimeout(() => {
      setFlames((prev) => prev.filter((f) => !newFlames.find((nf) => nf.id === f.id)));
    }, 1200);
  };

  const handleSubmit = () => {
    if (!message.trim()) return;
    const newEntry: Entry = {
      id: Date.now(),
      nickname: nickname || '익명',
      message,
      flower: selectedFlower,
    };
    setEntries([newEntry, ...entries]);
    setMessage('');
    setNickname('');
    if (selectedFlower.name === 'Hellfire') triggerFlame(10);
  };

  const handleRandomTribute = () => {
    const newEntry: Entry = {
      id: Date.now(),
      nickname: 'blackmidi Hit tweet',
      message: randomTributes[Math.floor(Math.random() * randomTributes.length)],
      flower: selectedFlower,
    };
    setEntries([newEntry, ...entries]);
    if (selectedFlower.name === 'Hellfire') triggerFlame(10);
  };

  const toggleAudio = () => {
    if (!audioRef.current) return;
    if (audioPlaying) {
      audioRef.current.pause();
      setAudioPlaying(false);
    } else {
      audioRef.current.play()
        .then(() => setAudioPlaying(true))
        .catch((err) => {
          console.warn("Autoplay failed, user interaction required.", err);
        });
    }
  };

  return (
    <>
      <audio ref={audioRef} loop>
        <source src="/Hellfire.mp3" type="audio/mpeg" />
      </audio>

      <div
        className={`p-6 max-w-3xl mx-auto min-h-screen text-white relative overflow-hidden backdrop-blur-md ${gothic.className}`}
        style={{
          backgroundImage: 'url("/Black-Midi-Hellfire.webp")',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundAttachment: 'fixed'
        }}
      >
        <button
          onClick={toggleAudio}
          className="fixed top-4 right-4 bg-black/50 border border-white text-white px-4 py-1 rounded-md z-50 hover:bg-red-500"
        >
          {audioPlaying ? '🔇 Stop Music' : '🔊 Play Music'}
        </button>

        <div className="mb-2 text-center px-4 py-4 bg-black/80 rounded-xl border border-red-600 shadow-lg">
          <h1 className="text-5xl font-bold text-red-400 tracking-wide">In Loving Memory of blackmidi</h1>
          <p className="mt-2 text-md text-red-200 italic">“1st Anniversary Memorial of blackmidi Disbandment”</p>
        </div>

        <p className="text-red-300 text-center italic text-sm mb-4">
          {quotes[Math.floor(Math.random() * quotes.length)]}
        </p>

        <div className="bg-black/70 shadow-xl rounded-xl p-6 space-y-4 backdrop-blur-md">
          <input
            type="text"
            placeholder="닉네임 (선택)"
            value={nickname}
            onChange={(e) => setNickname(e.target.value)}
            className="w-full border border-red-500 text-white p-3 rounded-lg bg-black/50 focus:outline-none focus:ring-2 focus:ring-red-400"
          />
          <textarea
            placeholder="블랙미디에게 전하는 마지막 한마디"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            className="w-full border border-red-500 text-white p-3 rounded-lg h-28 bg-black/50 focus:outline-none focus:ring-2 focus:ring-red-400"
          />
          <div className="flex gap-2 flex-wrap">
            {flowers.map((flower) => (
              <button
                key={flower.name}
                onClick={() => setSelectedFlower(flower)}
                className={`px-4 py-2 rounded-full text-sm font-semibold shadow-sm transition ${
                  selectedFlower.name === flower.name
                    ? 'bg-red-600 text-white'
                    : 'bg-black/50 text-red-300 border border-red-400 hover:bg-red-800/70'
                }`}
              >
                {flower.emoji} {flower.name}
              </button>
            ))}
          </div>
          <div className="flex gap-2">
            <button
              onClick={handleSubmit}
              className="flex-1 bg-gradient-to-r from-red-600 to-red-800 text-white py-3 rounded-xl hover:opacity-90 font-bold tracking-wide"
            >
              방명록 남기기
            </button>
            <button
              onClick={handleRandomTribute}
              className="flex-1 bg-black/40 border border-red-400 text-red-300 py-3 rounded-xl hover:bg-red-800/60 font-bold tracking-wide"
            >
              Hit Quotes
            </button>
          </div>
        </div>

        <div className="mt-10 space-y-4">
          {entries.map((entry) => (
            <motion.div
              key={entry.id}
              initial={{ opacity: 0, x: -20, rotate: -1 }}
              animate={{ opacity: 1, x: 0, rotate: 0 }}
              transition={{ duration: 0.4 }}
            >
              <div className="bg-black/70 border border-red-700 rounded-xl p-4">
                <div className="flex items-center gap-2 font-semibold text-lg text-white">
                  <span>{entry.flower.emoji}</span>
                  <span className="text-white">{entry.nickname}</span>
                </div>
                <p className="mt-2 text-red-200 whitespace-pre-wrap">{entry.message}</p>
              </div>
            </motion.div>
          ))}
        </div>

        {flames.map((flame) => (
          <motion.div
            key={flame.id}
            initial={{ opacity: 1, y: 0 }}
            animate={{ opacity: 0, y: -200 }}
            transition={{ duration: 1.2 }}
            style={{
              position: 'fixed',
              bottom: 40,
              left: flame.left + '%',
              fontSize: flame.size + 'px',
              zIndex: 50,
              pointerEvents: 'none',
            }}
          >
            🔥
          </motion.div>
        ))}
      </div>
    </>
  );
}
