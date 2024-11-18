"use client";

import { useCanvas } from "@/hooks/useCanvas";
import CanvasController from "./canvas-controller";
import CanvasBottomText from "./canvas-bottom-text";
import { useAi } from "@/hooks/useAi";
import CanvasTopText from "./canvas-top-text";

type CanvasProps = {
  width?: number;
  height?: number;
};

const Canvas = ({ width = 1080, height = 720 }: CanvasProps) => {
  const {
    canvasRef,
    currentColor,
    drawingMode,
    startDrawing,
    draw,
    setCurrentColor,
    toggleMode,
    saveImage,
    clearCanvas,
    handleMouseUp,
    undo,
  } = useCanvas();

  const {
    message,
    isMessageLoading,
    sendImage,
    sendPost,
    word,
    setAnswerWord,
  } = useAi({
    canvasRef,
  });

  const handleMouseDown = (e: React.MouseEvent<HTMLCanvasElement>) => {
    startDrawing(e.nativeEvent);
  };

  return (
    <div className="flex flex-col items-center justify-center gap-4 w-full h-full pt-8">
      <CanvasTopText word={word} setAnswerWord={setAnswerWord} />

      <canvas
        ref={canvasRef}
        width={width}
        height={height}
        className={`
          border border-gray-300 rounded-lg bg-white
          ${drawingMode === "erase" ? "cursor-cell" : "cursor-crosshair"}
        `}
        onMouseDown={handleMouseDown}
        onMouseMove={draw}
        onMouseUp={handleMouseUp}
        onMouseOut={handleMouseUp}
      />
      <CanvasController
        currentColor={currentColor}
        drawingMode={drawingMode}
        setCurrentColor={setCurrentColor}
        toggleMode={toggleMode}
        saveImage={saveImage}
        clearCanvas={clearCanvas}
        undo={undo}
      />
      <CanvasBottomText
        sendImage={sendImage}
        message={message}
        isMessageLoading={isMessageLoading}
        sendPost={sendPost}
      />
    </div>
  );
};

export default Canvas;
