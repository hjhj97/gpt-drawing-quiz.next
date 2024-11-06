"use server";
import OpenAI from "openai";
const client = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });

export const sendMessage = async (imageData: string) => {
  const chatCompletion = await client.chat.completions.create({
    messages: [
      {
        role: "system",
        content: [
          {
            type: "text",
            text: "You are given a image file. This image is not real picture. It is a simple drawing, drawn by Canvas API.",
          },
        ],
      },
      {
        role: "user",
        content: [
          {
            type: "text",
            text: "What’s in this image? Please summarize it within 30 characters",
          },
          {
            type: "image_url",
            image_url: {
              url: imageData,
            },
          },
        ],
      },
    ],
    model: "gpt-4o-mini",
  });
  return chatCompletion.choices[0].message.content;
};
