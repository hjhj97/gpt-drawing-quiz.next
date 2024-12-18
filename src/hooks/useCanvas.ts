import { downloadImageAsBlob, getFileName } from "@/utils/file";
import { useRef, useState, useEffect, useCallback } from "react";

export const MODE = {
  DRAW: "draw",
  ERASE: "erase",
} as const;

export type DrawingMode = (typeof MODE)[keyof typeof MODE];

const MOUSE_CLICK = {
  LEFT: 0,
  RIGHT: 2,
} as const;

const LINE_WIDTH = {
  THIN: 2,
  THICK: 15,
} as const;

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

  const startDrawing = useCallback(
    (e: MouseEvent): void => {
      if (!context || !canvasRef.current) return;

      const rect = canvasRef.current.getBoundingClientRect();
      const offsetX = e.clientX - rect.left;
      const offsetY = e.clientY - rect.top;

      context.beginPath();
      context.moveTo(offsetX, offsetY);
      setIsDrawing(true);
    },
    [context, canvasRef]
  );

  const undo = useCallback(() => {
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
  }, [canvasRef, undoStack]);

  const addKeyboardEvent = useCallback(() => {
    // TODO: 단축키로 누르면 undoStack 길이가 0으로 고정되는 버그 수정
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.ctrlKey || e.metaKey) && e.key === "z") {
        undo();
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [undo]);

  useEffect(() => {
    addKeyboardEvent();
  }, [addKeyboardEvent]);

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

  const handleContextMenu = useCallback((e: MouseEvent) => {
    e.preventDefault();
  }, []);

  const handleMouseDown = useCallback(
    (e: MouseEvent) => {
      if (e.button === MOUSE_CLICK.RIGHT) {
        // 우클릭
        setLineWidth(LINE_WIDTH.THICK);
      } else {
        // 좌클릭
        setLineWidth(LINE_WIDTH.THIN);
      }
      startDrawing(e);
    },
    [startDrawing]
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

  const draw = useCallback(
    (e: React.MouseEvent<HTMLCanvasElement>): void => {
      if (!isDrawing || !context) return;

      const { offsetX, offsetY } = e.nativeEvent;
      context.lineTo(offsetX, offsetY);
      context.stroke();
    },
    [isDrawing, context]
  );

  const toggleMode = useCallback(() => {
    setDrawingMode((prev) => (prev === MODE.DRAW ? MODE.ERASE : MODE.DRAW));
  }, [setDrawingMode]);

  const saveImage = useCallback(() => {
    if (!canvasRef.current) return;
    canvasRef.current.toBlob((blob) => {
      if (!blob) return;
      downloadImageAsBlob(blob, getFileName());
    });
  }, [canvasRef]);

  const clearCanvas = useCallback(() => {
    if (!context || !canvasRef.current) return;
    context.clearRect(0, 0, canvasRef.current.width, canvasRef.current.height);
  }, [context, canvasRef]);

  const saveState = useCallback(() => {
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
  }, [canvasRef, isDrawing]);

  const handleMouseUp = useCallback(() => {
    if (isDrawing) {
      saveState();
    }
    setIsDrawing(false);
    setLineWidth(LINE_WIDTH.THIN);
  }, [isDrawing, saveState]);

  return {
    canvasRef,
    currentColor,
    setCurrentColor,
    drawingMode,
    startDrawing,
    draw,
    toggleMode,
    saveImage,
    clearCanvas,
    handleMouseUp,
    undo,
    handleContextMenu,
  };
};
