"use server";

import { client } from "./config";

export const generateImage = async (prompt: string) => {
  const response = await client.images.generate({
    prompt,
    n: 1,
    size: "256x256",
    model: "dall-e-2",
  });
  const imageUrl = response.data[0].url;

  if (!imageUrl) throw new Error("이미지 생성 중 에러가 발생했습니다.");
  return imageUrl;
};
