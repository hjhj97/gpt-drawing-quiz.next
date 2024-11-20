"use server";

import { IQuiz } from "@/types/quiz";
import { generateImage } from "./openai/generate-image";
import { createClient } from "@/utils/supabase/server";
import { SENTENCES } from "@/constant/random-sentence";
import PhraseGen from "korean-random-words";

export const getAllQuizs = async (): Promise<IQuiz[] | null> => {
  const client = await createClient();
  const { data, error } = await client.from("quizs").select("*");
  if (error) throw new Error(error.message);
  return data;
};

export const getQuizById = async (id: string): Promise<IQuiz | null> => {
  const client = await createClient();
  const { data, error } = await client.from("quizs").select("*").eq("id", id);
  if (error) throw new Error(error.message);
  return data[0];
};

export const checkAnswer = async (id: string, answer: string) => {
  const client = await createClient();
  const { data, error } = await client.from("quizs").select("*").eq("id", id);
  if (error) throw new Error(error.message);
  return data[0].answer === answer;
};

export const createQuiz = async () => {
  const client = await createClient();
  const phraseGen = new PhraseGen();
  const phrase = phraseGen.generatePhrase();
  console.log(phrase);

  const imageUrl = await generateImage(phrase);

  const { data, error } = await client.from("quizs").insert({
    answer: phrase,
    image_url: imageUrl,
  });
  if (error) throw new Error(error.message);
  return data;
};

export const getRandomSentence = async () => {
  return SENTENCES[Math.floor(Math.random() * SENTENCES.length)];
};
