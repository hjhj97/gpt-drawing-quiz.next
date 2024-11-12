"use client";

import { useEffect, useState } from "react";
type RandomWordProps = {
  word: string;
  setRandomWord: () => void;
};

export default function RandomWord({ word, setRandomWord }: RandomWordProps) {
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  if (!isClient) return null;
  return (
    <div className="flex items-center justify-between gap-4 h-[36px]">
      <p>
        제시어 : <span className="font-bold">{word}</span>
      </p>
      <button
        className="bg-green-400 text-white px-2 py-2 rounded-md text-sm"
        onClick={setRandomWord}
      >
        다른 단어
      </button>
    </div>
  );
}
