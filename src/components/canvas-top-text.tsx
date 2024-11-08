import { getRandomWord } from "@/app/actions/words";
import { useEffect, useMemo, useState } from "react";

export default function CanvasTopText() {
  const [isClient, setIsClient] = useState(false);
  const [word, setWord] = useState(() => getRandomWord());

  useEffect(() => {
    setIsClient(true);
  }, []);

  if (!isClient) return null;

  return (
    <div>
      <p>
        제시어 : <span className="font-bold">{word}</span>
      </p>
      <button className="" onClick={() => setWord(getRandomWord())}>
        새로 고침
      </button>
    </div>
  );
}
