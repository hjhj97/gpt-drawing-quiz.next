"use server";
import { WORDS } from "@/constant/random-word";

export const getRandomWord = async () => {
  return WORDS[Math.floor(Math.random() * WORDS.length)];
};
