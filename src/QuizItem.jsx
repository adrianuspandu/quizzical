import AnswerButton from "./AnswerButton"
import {nanoid} from "nanoid"
export default function QuizItem({
  question,
  answers,
  correctAnswer,
  pickedAnswer,
  onClick,
  id,
  gameState
}) {
  const answerButtons = answers.map(function(answer) {
    const buttonId = nanoid()
    return (
        <AnswerButton
          key={buttonId}
          id={buttonId}
          quizId={id}
          isCorrect={answer === correctAnswer}
          isPicked={answer === pickedAnswer}
          isFalse={answer !== correctAnswer}
          onClick={onClick}
          gameState={gameState}
        >{answer}
        </AnswerButton>
    )
  })
  return (
    <div id={id} className="quiz-item">
      <h2>{question}</h2>
      <div className="answers-container">
        {answerButtons}
      </div>
    </div>
  );
}
