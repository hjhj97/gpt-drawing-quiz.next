import { sendMessage } from "@/app/actions/openai/query-image";
import { createPost } from "@/app/actions/post";
import { getRandomWord } from "@/app/actions/words";
import { getBase64Image } from "@/utils/file";
import { useEffect, useMemo, useCallback, useState } from "react";

export const useAi = ({
  canvasRef,
}: {
  canvasRef: React.RefObject<HTMLCanvasElement>;
}) => {
  const [word, setWord] = useState<string>("");
  const [message, setMessage] = useState<string>("");
  const [isMessageLoading, setIsMessageLoading] = useState<boolean>(false);

  const setAnswerWord = useCallback(async (customWord?: string) => {
    if (!customWord) {
      const newWord = await getRandomWord();
      setWord(newWord);
    } else {
      setWord(customWord || "");
    }
  }, []);

  useEffect(() => {
    setAnswerWord();
  }, [setAnswerWord]);

  const sendImage = useCallback(async () => {
    const imageData = getBase64Image(canvasRef);
    if (!imageData) {
      throw new Error("Image data is not available");
    }

    try {
      setIsMessageLoading(true);
      const response = await sendMessage(imageData);
      setMessage(response || "");
    } catch (error) {
      alert("서버 오류가 발생했습니다." + error);
    } finally {
      setIsMessageLoading(false);
    }
  }, [canvasRef]);

  const isCorrect = useMemo(() => {
    const splitedMessage = message.split(" ");
    const isCorrect = splitedMessage.includes(word);
    return isCorrect;
  }, [message, word]);

  const sendPost = useCallback(async () => {
    if (!canvasRef.current) {
      throw new Error("캔버스가 존재하지 않습니다.");
    }
    canvasRef.current.toBlob(async (blob) => {
      if (!blob) throw new Error("이미지 형식이 올바르지 않습니다.");
      await createPost(
        { answer: word, guess: message, is_correct: isCorrect },
        blob
      );
    });
  }, [canvasRef, word, message, isCorrect]);

  return {
    message,
    isMessageLoading,
    sendImage,
    sendPost,
    word,
    setAnswerWord,
    isCorrect,
  };
};
