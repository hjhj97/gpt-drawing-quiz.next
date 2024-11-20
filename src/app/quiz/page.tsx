import QuizList from "@/components/quiz/card-list";
import QuizController from "@/components/quiz/quiz-controller";

export default function Quiz() {
  return (
    <div className="flex flex-col items-center justify-center">
      <h2 className="text-2xl font-bold">GPT가 그린 이미지를 맞춰보세요</h2>
      <QuizList />
      <QuizController />
    </div>
  );
}
