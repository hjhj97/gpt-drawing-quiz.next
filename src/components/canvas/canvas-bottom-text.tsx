import { useGoogleSession } from "@/context/google-session-context";
import Image from "next/image";
import { memo, useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

type CanvasBottomTextProps = {
  message: string;
  isMessageLoading: boolean;
  sendPost: () => Promise<void>;
  sendImage: () => Promise<void>;
};

type GptActionButtonProps = {
  sendImage: () => Promise<void>;
  isMessageLoading: boolean;
  handleSendPost: () => Promise<void>;
  isSending: boolean;
};

function CanvasBottomText({
  message,
  isMessageLoading,
  sendPost,
  sendImage,
}: CanvasBottomTextProps) {
  const [isSending, setIsSending] = useState<boolean>(false);

  const handleSendPost = async () => {
    setIsSending(true);
    await sendPost();
    toast.success("업로드 완료");
    setIsSending(false);
  };

  return (
    <div className="flex flex-col gap-4">
      <div className="flex gap-4">
        <GptCaution />
        <GptActionButton
          sendImage={sendImage}
          isMessageLoading={isMessageLoading}
          handleSendPost={handleSendPost}
          isSending={isSending}
        />
      </div>
      <GptAnswer isMessageLoading={isMessageLoading} message={message} />
      <ToastContainer
        position="bottom-center"
        autoClose={3000}
        hideProgressBar={true}
        closeOnClick
        theme="light"
      />
    </div>
  );
}

function GptAnswer({
  isMessageLoading,
  message,
}: {
  isMessageLoading: boolean;
  message: string;
}) {
  return isMessageLoading ? (
    <p>전송 중...</p>
  ) : message ? (
    <div>
      <p className="text-lg font-bold bg-yellow-100 p-3 rounded-lg shadow-md border-2 border-yellow-300">
        GPT Think: {message}
      </p>
    </div>
  ) : null;
}

function GptActionButton({
  sendImage,
  isMessageLoading,
  handleSendPost,
  isSending,
}: GptActionButtonProps) {
  const { session } = useGoogleSession();
  return (
    <div className="flex items-center gap-2">
      <button
        onClick={sendImage}
        disabled={isMessageLoading || !session}
        className="flex items-center gap-2 px-4 py-2 bg-purple-500 disabled:opacity-50 text-white rounded-md transition-colors"
      >
        <Image src={"./gpt-logo.svg"} alt="gpt-logo" width={20} height={20} />
        GPT에 전송
      </button>
      <button
        onClick={handleSendPost}
        disabled={isSending || !session}
        className=" bg-red-300 text-white px-4 py-2 rounded-md disabled:opacity-50"
      >
        {isSending ? "업로드 중..." : "박물관에 업로드하기"}
      </button>
    </div>
  );
}

function GptCaution() {
  const gptCaution = [
    "GPT의 답변은 오직 영어로만 가능합니다",
    "마우스 좌클릭으로 얇은 선, 우클릭으로 굵은 선을 그릴 수 있습니다.",
    "로그인해야만 GPT와 업로드 기능을 이용할 수 있습니다.",
    "추후 계정 당 하루 이용 횟수가 제한될 수 있습니다.",
  ];

  return (
    <div className="flex flex-col">
      <p className="font-bold text-lg">유의사항</p>
      <ul className="flex flex-col">
        {gptCaution.map((caution, index) => (
          <li key={index}>{caution}</li>
        ))}
      </ul>
    </div>
  );
}

export default memo(CanvasBottomText);
