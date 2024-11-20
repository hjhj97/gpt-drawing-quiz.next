import { IQuiz } from "@/types/quiz";
import Image from "next/image";

type QuizCardProps = {
  quiz: IQuiz;
};

export default function QuizCard({ quiz }: QuizCardProps) {
  return (
    <a href={`/quiz/${quiz.id}`}>
      <div className="flex flex-col items-center">
        <div className="relative w-full aspect-square">
          <Image src={quiz.image_url} alt="quiz" width={512} height={512} />
        </div>
        <p className="mt-4 text-lg font-medium">{quiz.answer}</p>
      </div>
    </a>
  );
}
