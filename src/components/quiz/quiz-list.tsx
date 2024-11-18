import { getAllQuizs } from "@/app/actions/quiz";
import Image from "next/image";

export default async function QuizList() {
  const quizs = await getAllQuizs();
  if (!quizs || quizs.length === 0) return <div>No quizs!</div>;
  return (
    <div>
      {quizs?.map((quiz) => (
        <div key={quiz.id}>
          <Image src={quiz.image_url} alt="quiz" width={512} height={512} />
          <p>{quiz.answer}</p>
        </div>
      ))}
    </div>
  );
}
