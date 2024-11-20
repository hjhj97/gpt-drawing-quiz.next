import { getQuizById } from "@/app/actions/quiz";
import Image from "next/image";
import QuizForm from "./form";

export default async function QuizPage({ params }: any) {
  const { id } = await params;
  const quiz = await getQuizById(id);

  if (!quiz) return <div>Quiz not found</div>;

  return (
    <div>
      <Image src={quiz.image_url} alt="quiz" width={512} height={512} />
      <QuizForm id={id} />
    </div>
  );
}
