import { sendMessage } from "@/app/actions/openai";
import { createPost } from "@/app/actions/post";
import { b64toBlob, getBase64Image } from "@/utils/file";
import { useState } from "react";

export const useAi = ({
  canvasRef,
}: {
  canvasRef: React.RefObject<HTMLCanvasElement>;
}) => {
  const [message, setMessage] = useState<string>("");
  const [isMessageLoading, setIsMessageLoading] = useState<boolean>(false);

  const sendImage = async () => {
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
  };

  const sendPost = async () => {
    const b64ImageData = getBase64Image(canvasRef);
    if (!b64ImageData) {
      throw new Error("Image data is not available");
    }
    const blobImageData = b64toBlob(b64ImageData);
    await createPost({ answer: "test", guess: message }, blobImageData);
  };

  return { message, isMessageLoading, sendImage, sendPost };
};
