"use server";
import { IQuiz } from "@/types/quiz";
import { generateImage } from "./openai/generate-image";
import { createClient } from "@/utils/supabase/server";
import { SENTENCES } from "@/constant/random-sentence";

export const getAllQuizs = async (): Promise<IQuiz[] | null> => {
  const client = await createClient();
  const { data, error } = await client.from("quizs").select("*");
  if (error) throw new Error(error.message);
  return data;
};

export const createQuiz = async () => {
  const client = await createClient();
  const answer = await getRandomSentence();
  const imageUrl = await generateImage(answer);

  const { data, error } = await client.from("quizs").insert({
    answer,
    image_url: imageUrl,
  });
  if (error) throw new Error(error.message);
  return data;
};

export const getRandomSentence = async () => {
  return SENTENCES[Math.floor(Math.random() * SENTENCES.length)];
};
