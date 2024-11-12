import { useRef, useState, useEffect, useCallback } from "react";
import { getBase64Image } from "@/utils/file";

type DrawingMode = "draw" | "erase";

const MOUSE_CLICK = {
  LEFT: 0,
  RIGHT: 2,
} as const;

const LINE_WIDTH = {
  THIN: 2,
  THICK: 15,
} as const;

// 색상 상수 추가
export const COLORS = {
  BLACK: "#000000",
  RED: "#FF0000",
  BLUE: "#0000FF",
  GREEN: "#008000",
  YELLOW: "#FFD700",
} as const;

export const useCanvas = () => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const [isDrawing, setIsDrawing] = useState<boolean>(false);
  const [context, setContext] = useState<CanvasRenderingContext2D | null>(null);
  const [currentColor, setCurrentColor] = useState<string>(COLORS.BLACK);
  const [drawingMode, setDrawingMode] = useState<DrawingMode>("draw");
  const [undoStack, setUndoStack] = useState<ImageData[]>([]);
  const [lineWidth, setLineWidth] = useState<number>(2);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    ctx.strokeStyle = currentColor;
    ctx.lineWidth = lineWidth;
    ctx.lineCap = "round";
    setContext(ctx);
  }, [lineWidth, currentColor]);

  useEffect(() => {
    addKeyboardEvent();
  }, []);

  useEffect(() => {
    if (!context) return;

    if (drawingMode === "erase") {
      context.globalCompositeOperation = "destination-out";
      context.strokeStyle = "rgba(0,0,0,1)";
    } else {
      context.globalCompositeOperation = "source-over";
      context.strokeStyle = currentColor;
    }
  }, [drawingMode, currentColor, context]);

  const handleContextMenu = useCallback(
    (e: React.MouseEvent<HTMLCanvasElement>) => {
      e.preventDefault();
    },
    []
  );

  const handleMouseDown = useCallback(
    (e: React.MouseEvent<HTMLCanvasElement>): void => {
      if (e.button === MOUSE_CLICK.RIGHT) {
        // 우클릭
        setLineWidth(LINE_WIDTH.THICK);
      } else {
        // 좌클릭
        setLineWidth(LINE_WIDTH.THIN);
      }
      startDrawing(e);
    },
    []
  );

  useEffect(() => {
    const canvas = canvasRef.current;
    if (canvas) {
      canvas.addEventListener("mousedown", handleMouseDown);
      canvas.addEventListener("contextmenu", handleContextMenu);
    }
    return () => {
      if (canvas) {
        canvas.removeEventListener("mousedown", handleMouseDown);
        canvas.removeEventListener("contextmenu", handleContextMenu);
      }
    };
  }, [canvasRef, handleMouseDown, handleContextMenu]);

  const addKeyboardEvent = () => {
    // TODO: 단축키로 누르면 undoStack 길이가 0으로 고정되는 버그 수정
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.ctrlKey || e.metaKey) && e.key === "z") {
        undo();
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  };

  const startDrawing = (e: React.MouseEvent<HTMLCanvasElement>): void => {
    if (!context) return;

    const { offsetX, offsetY } = e.nativeEvent;
    context.beginPath();
    context.moveTo(offsetX, offsetY);
    setIsDrawing(true);
  };

  const draw = (e: React.MouseEvent<HTMLCanvasElement>): void => {
    if (!isDrawing || !context) return;

    const { offsetX, offsetY } = e.nativeEvent;
    context.lineTo(offsetX, offsetY);
    context.stroke();
  };

  const toggleMode = () => {
    setDrawingMode((prev) => (prev === "draw" ? "erase" : "draw"));
  };

  const getFileName = () => {
    const date = new Date();
    return `drawing-${date.getFullYear()}${(date.getMonth() + 1)
      .toString()
      .padStart(2, "0")}${date.getDate().toString().padStart(2, "0")}-${date
      .getHours()
      .toString()
      .padStart(2, "0")}${date.getMinutes().toString().padStart(2, "0")}${date
      .getSeconds()
      .toString()
      .padStart(2, "0")}`;
  };

  const saveImage = () => {
    if (!canvasRef.current) return;

    const fileName = getFileName();
    const imageData = getBase64Image(canvasRef);
    if (!imageData) {
      throw new Error("Image data is not available");
    }
    const link = document.createElement("a");
    link.download = `${fileName}.png`;
    link.href = imageData;
    link.click();
  };

  const clearCanvas = () => {
    if (!context || !canvasRef.current) return;
    context.clearRect(0, 0, canvasRef.current.width, canvasRef.current.height);
  };

  const saveState = () => {
    if (!canvasRef.current || !isDrawing) return;
    const ctx = canvasRef.current.getContext("2d");
    if (!ctx) return;

    const imageData = ctx.getImageData(
      0,
      0,
      canvasRef.current.width,
      canvasRef.current.height
    );
    setUndoStack((prev) => [...prev, imageData]);
  };

  const undo = () => {
    if (!canvasRef.current || undoStack.length === 0) return;
    const ctx = canvasRef.current.getContext("2d");
    if (!ctx) return;

    const newStack = [...undoStack];
    newStack.pop();
    const lastState = newStack[newStack.length - 1];

    if (lastState) {
      ctx.putImageData(lastState, 0, 0);
      setUndoStack(newStack);
    } else {
      ctx.clearRect(0, 0, canvasRef.current.width, canvasRef.current.height);
      setUndoStack([]);
    }
  };

  const handleMouseUp = () => {
    if (isDrawing) {
      saveState();
    }
    setIsDrawing(false);
    setLineWidth(LINE_WIDTH.THIN);
  };

  return {
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
    handleContextMenu,
  };
};
