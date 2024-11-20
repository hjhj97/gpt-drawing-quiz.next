"use client";

import { checkAnswer } from "@/app/actions/quiz";
import { useState } from "react";

type TQuizForm = {
  id: string;
};

export default function QuizForm({ id }: TQuizForm) {
  const [isCorrect, setIsCorrect] = useState(false);

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    const answer = formData.get("answer");
    const result = await checkAnswer(id, answer as string);
    setIsCorrect(result);
  };

  return (
    <>
      <form onSubmit={handleSubmit}>
        <input type="text" name="answer" />
        <button type="submit">제출</button>
      </form>
      {isCorrect && <div>정답입니다.</div>}
    </>
  );
}
