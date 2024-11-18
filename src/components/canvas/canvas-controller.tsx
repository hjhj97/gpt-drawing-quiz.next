import React, { memo } from "react";
import { COLORS, DrawingMode, MODE } from "@/hooks/useCanvas";

type ColorButtonProps = {
  color: string;
  isSelected: boolean;
  onClick: () => void;
  disabled?: boolean;
};

type CanvasControllerProps = {
  currentColor: string;
  setCurrentColor: (color: string) => void;
  drawingMode: DrawingMode;
  toggleMode: () => void;
  saveImage: () => void;
  clearCanvas: () => void;
  undo: () => void;
};

const ColorButton = ({
  color,
  isSelected,
  onClick,
  disabled,
}: ColorButtonProps) => (
  <button
    onClick={onClick}
    disabled={disabled}
    className={`
      w-8 h-8 rounded-full transition-all
      ${isSelected ? "ring-2 ring-offset-2 ring-gray-400" : ""}
      ${disabled ? "opacity-50 cursor-not-allowed" : "hover:scale-110"}
    `}
    style={{ backgroundColor: color }}
    aria-label={`Select ${color} color`}
  />
);

function CanvasController({
  currentColor,
  setCurrentColor,
  drawingMode,
  toggleMode,
  saveImage,
  clearCanvas,
  undo,
}: CanvasControllerProps) {
  return (
    <div className="flex items-center gap-4">
      <div className="flex items-center gap-2">
        <span className="mr-2">색상:</span>
        <div className="flex gap-2">
          {Object.entries(COLORS).map(([_, color]) => (
            <ColorButton
              key={color}
              color={color}
              isSelected={currentColor === color}
              onClick={() => setCurrentColor(color)}
              disabled={drawingMode === MODE.ERASE}
            />
          ))}
        </div>
      </div>

      <button
        onClick={toggleMode}
        className={`
          px-4 py-2 rounded-md text-white transition-colors
          ${
            drawingMode === MODE.ERASE
              ? "bg-red-500 hover:bg-red-600"
              : "bg-blue-500 hover:bg-blue-600"
          }
        `}
      >
        {drawingMode === MODE.DRAW ? "지우개 모드" : "그리기 모드"}
      </button>

      <button
        onClick={saveImage}
        className="px-4 py-2 bg-green-500 hover:bg-green-600 text-white rounded-md transition-colors"
      >
        이미지 저장
      </button>

      <button
        onClick={clearCanvas}
        className="px-4 py-2 bg-yellow-500 hover:bg-yellow-600 text-white rounded-md transition-colors"
      >
        전체 지우기
      </button>

      <button
        onClick={undo}
        className="px-4 py-2 bg-gray-500 hover:bg-gray-600 text-white rounded-md transition-colors"
      >
        ↩ 실행 취소
      </button>
    </div>
  );
}
export default memo(CanvasController);
