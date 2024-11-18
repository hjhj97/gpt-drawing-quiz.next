export const b64toBlob = (
  b64Data: string,
  contentType: string = "image/png"
) => {
  const BASE64_MARKER = ";base64,";

  const b64 = b64Data.split(BASE64_MARKER)[1];
  const byteCharacters = atob(b64);
  const byteNumbers = new Array(byteCharacters.length);
  for (let i = 0; i < byteCharacters.length; i++) {
    byteNumbers[i] = byteCharacters.charCodeAt(i);
  }
  const byteArray = new Uint8Array(byteNumbers);
  const blob = new Blob([byteArray], { type: contentType });
  return blob;
};

export const getBase64Image = (
  canvasRef: React.RefObject<HTMLCanvasElement>
) => {
  if (!canvasRef.current) return;
  return canvasRef.current.toDataURL("image/png");
};

export const downloadImageAsBlob = (blob: Blob, fileName: string) => {
  if (!blob) throw new Error("Blob is not available");
  const link = document.createElement("a");
  link.download = `${fileName}.png`;
  link.href = URL.createObjectURL(blob);
  link.click();
};

export const getFileName = () => {
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
