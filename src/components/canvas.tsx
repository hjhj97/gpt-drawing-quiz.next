"use client";

import { useCanvas } from "@/hooks/useCanvas";
import CanvasController from "@/components/canvas-controller";
import CanvasBottomText from "@/components/canvas-bottom-text";

interface CanvasProps {
  width?: number;
  height?: number;
}

const Canvas: React.FC<CanvasProps> = ({ width = 1080, height = 720 }) => {
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
    sendImage,
    message,
    isMessageLoading,
    handleMouseUp,
    undo,
  } = useCanvas();

  return (
    <div className="flex flex-col items-center justify-center gap-4 w-full h-full">
      <h1 className="text-3xl font-bold">Canvas GPT Quiz </h1>
      <p className="text-md text-gray-500">
        그림을 그리면 gpt가 여러분들의 그림을 맞춰드립니다.
      </p>
      <canvas
        ref={canvasRef}
        width={width}
        height={height}
        className={`
          border border-gray-300 rounded-lg
          ${drawingMode === "erase" ? "cursor-cell" : "cursor-crosshair"}
        `}
        onMouseDown={startDrawing}
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
        sendImage={sendImage}
        isMessageLoading={isMessageLoading}
        clearCanvas={clearCanvas}
        undo={undo}
      />
      <CanvasBottomText message={message} isMessageLoading={isMessageLoading} />
    </div>
  );
};

export default Canvas;
