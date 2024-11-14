"use client";

import { useEffect, useState } from "react";

type RandomWordProps = {
  word: string;
  setAnswerWord: (customWord?: string) => void;
};

export default function RandomWord({ word, setAnswerWord }: RandomWordProps) {
  const [isClient, setIsClient] = useState(false);
  const [isCustom, setIsCustom] = useState(false);
  const [customWord, setCustomWord] = useState<string>("");

  useEffect(() => {
    setIsClient(true);
  }, []);

  const handleCustomWordSubmit = () => {
    setAnswerWord(customWord);
    resetCustomWord();
  };

  const resetCustomWord = () => {
    setCustomWord("");
    setIsCustom(false);
  };

  const handleRandomWord = () => {
    setAnswerWord();
    setCustomWord("");
  };

  if (!isClient) return null;

  return (
    <div className="flex items-center justify-between gap-4 h-[36px]">
      {isCustom ? (
        <CustomWordInput
          value={customWord}
          onChange={(e) => setCustomWord(e.target.value)}
        />
      ) : (
        <RandomWordDisplay word={word} onRandomWord={handleRandomWord} />
      )}

      {isCustom ? (
        <CustomWordActions
          onSubmit={handleCustomWordSubmit}
          onCancel={resetCustomWord}
        />
      ) : (
        <button
          className="bg-orange-400 text-white px-2 py-2 rounded-md text-sm"
          onClick={() => setIsCustom(true)}
        >
          직접 입력
        </button>
      )}
    </div>
  );
}

const CustomWordInput = ({
  value,
  onChange,
}: {
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}) => (
  <p>
    <input
      type="text"
      className="border-2 border-gray-300 rounded-md p-1"
      placeholder="영어 단어 입력"
      value={value}
      onChange={onChange}
    />
  </p>
);

const RandomWordDisplay = ({
  word,
  onRandomWord,
}: {
  word: string;
  onRandomWord: () => void;
}) => (
  <>
    <p>
      제시어 : <span className="font-bold">{word}</span>
    </p>
    <button
      className="bg-green-400 text-white px-2 py-2 rounded-md text-sm"
      onClick={onRandomWord}
    >
      다른 단어
    </button>
  </>
);

const CustomWordActions = ({
  onSubmit,
  onCancel,
}: {
  onSubmit: () => void;
  onCancel: () => void;
}) => (
  <div className="flex items-center gap-2">
    <button
      className="bg-green-400 text-white px-2 py-2 rounded-md text-sm"
      onClick={onSubmit}
    >
      확인
    </button>
    <button
      className="bg-red-400 text-white px-2 py-2 rounded-md text-sm"
      onClick={onCancel}
    >
      취소
    </button>
  </div>
);
