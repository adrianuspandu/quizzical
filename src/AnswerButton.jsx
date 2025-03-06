import Button from "./Button"
import clsx from "clsx"

export default function AnswerButton({gameState, quizId, id, children, isCorrect, isFalse, isPicked, onClick}) {
    const className = clsx({
        'small': true,
        'answer-btn': true,
        'is-correct': isCorrect && !gameState.isInGame,
        'is-false': isFalse && !gameState.isInGame && isPicked,
        'is-picked': isPicked && gameState.isInGame,
        'is-disabled': !gameState.isInGame
    })
    return(
        <Button disabled={!gameState.isInGame} id={id} className={className} onClick={() => onClick(children, quizId)}>{children}</Button>
    )
}