import RandomWord from "./random-word";

type CanvasTopTextProps = {
  word: string;
  setRandomWord: () => void;
};

export default function CanvasTopText({
  word,
  setRandomWord,
}: CanvasTopTextProps) {
  return (
    <div className="flex flex-col items-center justify-center gap-2 ">
      <div className="flex flex-col items-center justify-center gap-2 ">
        <h1 className="text-3xl font-bold">Canvas GPT Quiz</h1>
        <p className="text-md">
          그림을 그리면 gpt가 여러분들의 그림을 맞춰드립니다.
        </p>
      </div>
      {word ? (
        <RandomWord word={word} setRandomWord={setRandomWord} />
      ) : (
        <div className="h-[36px]">단어 불러오는 중...</div>
      )}
    </div>
  );
}
