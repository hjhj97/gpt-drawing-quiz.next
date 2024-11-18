"use client";
import { createQuiz } from "@/app/actions/quiz";

export default function QuizController() {
  return (
    <div>
      <button
        className="bg-blue-500 text-white p-2 rounded-md"
        onClick={createQuiz}
      >
        Make Quiz
      </button>
    </div>
  );
}
