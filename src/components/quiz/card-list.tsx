import { getAllQuizs } from "@/app/actions/quiz";
import QuizCard from "./card";

export default async function QuizList() {
  const quizs = await getAllQuizs();

  if (!quizs || quizs.length === 0) return <div>No quizs!</div>;
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-6xl mx-auto p-4">
      {quizs?.map((quiz) => (
        <QuizCard quiz={quiz} key={quiz.id} />
      ))}
    </div>
  );
}
