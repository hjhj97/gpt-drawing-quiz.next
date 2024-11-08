export default function CanvasBottomText({
  message,
  isMessageLoading,
  sendPost,
}: {
  message: string;
  isMessageLoading: boolean;
  sendPost: () => void;
}) {
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

      <button
        onClick={sendPost}
        className="mt-8 bg-red-300 text-white px-4 py-2 rounded-md"
      >
        게시판에 자랑하기
      </button>
    </div>
  );
}
