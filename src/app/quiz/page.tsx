import QuizList from "@/components/quiz/quiz-list";
import QuizController from "@/components/quiz/quiz-controller";

export default function Quiz() {
  return (
    <div className="flex flex-col items-center justify-center h-screen">
      Quiz
      <QuizList />
      <QuizController />
    </div>
  );
}
