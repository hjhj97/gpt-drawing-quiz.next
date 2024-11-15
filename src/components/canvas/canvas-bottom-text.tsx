import { useGoogleSession } from "@/context/google-session-context";
import Image from "next/image";
import { useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function CanvasBottomText({
  message,
  isMessageLoading,
  sendPost,
  sendImage,
}: {
  message: string;
  isMessageLoading: boolean;
  sendPost: () => Promise<void>;
  sendImage: () => Promise<void>;
}) {
  const [isSending, setIsSending] = useState<boolean>(false);
  const { session } = useGoogleSession();

  const handleSendPost = async () => {
    setIsSending(true);
    await sendPost();
    toast.success("업로드 완료");
    setIsSending(false);
  };

  return (
    <div className="flex flex-col gap-4">
      <div className="flex gap-4">
        <ul>
          <p className="font-bold">유의사항</p>
          <li>- GPT의 답변은 오직 영어로만 가능합니다</li>
          <li>- 로그인해야만 GPT,업로드 기능을 이용할 수 있습니다.</li>
          <li>- 추후 계정 당 하루 이용 횟수가 제한될 수 있습니다.</li>
        </ul>

        {session && (
          <div className="flex items-center gap-2">
            <button
              onClick={sendImage}
              disabled={isMessageLoading || !session}
              className="flex items-center gap-2 px-4 py-2 bg-purple-500 disabled:opacity-50 text-white rounded-md transition-colors"
            >
              <Image
                src={"./gpt-logo.svg"}
                alt="gpt-logo"
                width={20}
                height={20}
              />
              GPT에 전송
            </button>
            <button
              onClick={handleSendPost}
              disabled={isSending}
              className=" bg-red-300 text-white px-4 py-2 rounded-md"
            >
              {isSending ? "업로드 중..." : "박물관에 업로드하기"}
            </button>
          </div>
        )}
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
