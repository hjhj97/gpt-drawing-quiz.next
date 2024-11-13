import { useGoogleSession } from "@/context/google-session-context";
import { useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function CanvasBottomText({
  message,
  isMessageLoading,
  sendPost,
}: {
  message: string;
  isMessageLoading: boolean;
  sendPost: () => Promise<void>;
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
    <div>
      <p>오직 영어로만 답변이 가능합니다</p>
      {isMessageLoading ? (
        <p>전송 중...</p>
      ) : message ? (
        <div>
          <p className="text-lg font-bold bg-yellow-100 p-3 rounded-lg shadow-md border-2 border-yellow-300">
            GPT Think: {message}
          </p>
        </div>
      ) : null}

      {session && (
        <button
          onClick={handleSendPost}
          disabled={isSending}
          className="mt-8 bg-red-300 text-white px-4 py-2 rounded-md"
        >
          {isSending ? "업로드 중..." : "박물관에 업로드하기"}
        </button>
      )}
      <ToastContainer
        position="bottom-center"
        autoClose={3000}
        hideProgressBar={true}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        theme="light"
      />
    </div>
  );
}
