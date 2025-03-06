import { useState, useEffect } from "react";
import Button from "./Button";
import QuizItem from "./QuizItem";
import he from "he";
import { nanoid } from "nanoid";

function App() {
  const [gameState, setGameState] = useState({
    isInGame: false,
    gameCount: 0,
    isFirstGame: true
  });

  const [questions, setQuestions] = useState([]);

  // DERIVED STATE VALUES
  const allGuessed = determineAllGuessed();
  const correctAnswer = determineCorrectAnswer();

  // USE EFFECT
  useEffect(() => {
    fetch("https://opentdb.com/api.php?amount=5&type=multiple")
      .then((res) => res.json())
      .then(function (data) {
        if (data.results) {
          setQuestions(
            data.results.map(function (obj) {
              const decodedIncorrectAnswers = obj.incorrect_answers.map(
                (item) => he.decode(item)
              );
              return {
                question: he.decode(obj.question),
                correctAnswer: he.decode(obj.correct_answer),
                answers: [
                  ...decodedIncorrectAnswers,
                  he.decode(obj.correct_answer),
                ],
                pickedAnswer: "",
                id: nanoid(),
              };
            })
          );
        }
      });
  }, [gameState.gameCount]);

  // CONSTANT VALUES
  const quizItems = questions.map(function (question) {
    return (
      <QuizItem
        key={question.id}
        id={question.id}
        pickedAnswer={question.pickedAnswer}
        question={question.question}
        answers={question.answers}
        correctAnswer={question.correctAnswer}
        onClick={handleAnswer}
        gameState={gameState}
      />
    );
  });

  // HELPER FUNCTIONS
  function startQuiz() {
    console.log("start quiz clicked");
    if (gameState.isFirstGame) {
      setGameState({isInGame: true, gameCount: 0, isFirstGame: false})
    }
    else {
      setGameState((prev) => ({ isInGame: true, gameCount: prev.gameCount + 1 }));
    }
  }

  function determineAllGuessed() {
    return questions.every((question) => question.pickedAnswer);
  }

  function determineCorrectAnswer() {
    let count = 0;
    questions.forEach(function (question) {
      if (question.pickedAnswer === question.correctAnswer) {
        count++;
      }
    });
    return count;
  }

  function checkAnswers() {
    console.log("check answers clicked");
    setGameState((prev) => ({ isInGame: false, gameCount: prev.gameCount }));
  }

  function handleAnswer(pickedAnswer, quizId) {
    setQuestions(function (prev) {
      const newQuestions = prev.map(function (quizItem) {
        if (quizItem.id === quizId) {
          return { ...quizItem, pickedAnswer: pickedAnswer };
        } else {
          return quizItem;
        }
      });
      return newQuestions;
    });
  }

  return (
    <main>
      {gameState.isFirstGame && !gameState.isInGame && (
        <section className="intro-section">
          <h1 className="title">Quizzical</h1>
          <p className="subtitle">
            Unleash your inner trivia champion! 🧠💡 Test your wits, challenge
            your friends, and conquer the leaderboard—one mind-bending question
            at a time!
          </p>
          <Button className="large" onClick={startQuiz}>
            Start quiz
          </Button>
        </section>
      )}
      {!gameState.isFirstGame && (
        <section className="quiz-section">
          {quizItems}
          <div className="bottom-container">
            {allGuessed && gameState.isInGame && (
              <Button onClick={checkAnswers}>Check answers</Button>
            )}
            {!gameState.isInGame && (
              <>
                <p>{`You scored ${correctAnswer}/${questions.length} correct answers`}</p>
                <Button onClick={startQuiz}>Play again</Button>
              </>
            )}
          </div>
        </section>
      )}
    </main>
  );
}

export default App;
