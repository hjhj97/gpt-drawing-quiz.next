"use server";
import { IQuiz } from "@/types/quiz";
import { generateImage } from "./openai/generate-image";
import { createClient } from "@/utils/supabase/server";

export const getAllQuizs = async (): Promise<IQuiz[] | null> => {
  const client = await createClient();
  const { data, error } = await client.from("quizs").select("*");
  if (error) throw new Error(error.message);
  return data;
};

export const createQuiz = async () => {
  const client = await createClient();
  const answer = "cat";
  const imageUrl = await generateImage(answer);

  const { data, error } = await client.from("quizs").insert({
    answer,
    image_url: imageUrl,
  });
  if (error) throw new Error(error.message);
  return data;
};
