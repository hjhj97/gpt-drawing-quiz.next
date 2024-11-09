import { useEffect, useState } from "react";

type CanvasTopTextProps = {
  word: string;
  setRandomWord: () => void;
};

export default function CanvasTopText({
  word,
  setRandomWord,
}: CanvasTopTextProps) {
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  if (!isClient) return null;

  return (
    <div>
      <p>
        제시어 : <span className="font-bold">{word}</span>
      </p>
      <button
        className="bg-gray-500 text-white px-4 py-2 rounded-md"
        onClick={setRandomWord}
      >
        다른 단어
      </button>
    </div>
  );
}
