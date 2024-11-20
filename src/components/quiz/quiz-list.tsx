import { getAllQuizs } from "@/app/actions/quiz";
import Image from "next/image";

export default async function QuizList() {
  const quizs = await getAllQuizs();

  if (!quizs || quizs.length === 0) return <div>No quizs!</div>;
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-6xl mx-auto p-4">
      {quizs?.map((quiz) => (
        <div key={quiz.id} className="flex flex-col items-center">
          <div className="relative w-full aspect-square">
            <Image src={quiz.image_url} alt="quiz" width={512} height={512} />
          </div>
          <p className="mt-4 text-lg font-medium">{quiz.answer}</p>
        </div>
      ))}
    </div>
  );
}
