import { useState } from "react";
import { Difficulty, fetchQuizQuestions, QuestionState } from "./API";
// Types
import QuestionCard from "./components/QuestionCard";

export interface AnswerObject {
	question: string;
	answer: string;
	correctAnswer: string;
	correct: boolean;
}

const TOTAL_QUESTIONS = 10;

function App() {
	const [loading, setLoading] = useState(false);
	const [questions, setQuestions] = useState<QuestionState[]>([]);
	const [number, setNumber] = useState(0);
	const [userAnswers, setUserAnswers] = useState<AnswerObject[]>([]);
	const [score, setScore] = useState(0);
	const [gameOver, setGameOver] = useState(true);
	console.log(questions);
	// -----------------------------
	const startTrivia = async () => {
		setLoading(true);
		setGameOver(false);

		// index aléatoire de Difficulty
		const randIndexDiff = Math.floor(Math.random() * 3);
		const newQuestions = await fetchQuizQuestions(
			TOTAL_QUESTIONS,
			Object.values(Difficulty)[randIndexDiff]
		);
		setQuestions(newQuestions);
		setScore(0);
		setUserAnswers([]);
		setNumber(0);
		setLoading(false);
	};

	const checkAnswer = (e: React.MouseEvent<HTMLButtonElement>) => {
		if (!gameOver) {
			// users answer
			const answer = e.currentTarget.value;
			// Check answer against corret answer
			const correct = questions[number].correct_answer === answer;
			// Add score if answer is correct
			if (correct) setScore((prevScore) => prevScore + 1);
			// Save answer in the array for user answers
			const answerObject = {
				question: questions[number].question,
				answer,
				correct,
				correctAnswer: questions[number].correct_answer,
			};
			setUserAnswers((prevUserAns) => [...prevUserAns, answerObject]);
		}
	};

	const nextQuestion = () => {
		let nextQuestion = number + 1;
		if (nextQuestion === TOTAL_QUESTIONS) {
			setGameOver(true);
		} else {
			setNumber(nextQuestion);
		}
	};
	console.log(gameOver);
	return (
		<div className="App  flex justify-center items-center">
			<div className="w-1/2  bg-yellow-50 p-6 flex flex-col justify-center items-center">
				<h1 className="p-6 ">QUIZZZZZZZ</h1>
				{gameOver || userAnswers.length === TOTAL_QUESTIONS ? (
					<button
						className="bg-green-300 hover:bg-green-500 p-2 mb-4 rounded"
						onClick={startTrivia}
					>
						Start
					</button>
				) : null}

				{!gameOver && !loading ? (
					<p>Score: {score}</p>
				) : (
					<p>Last score: {score}</p>
				)}

				{loading && <p className="p-4">Loading Questions....</p>}

				{!loading &&
					!gameOver &&
					userAnswers.length !== TOTAL_QUESTIONS && (
						<QuestionCard
							questionNumber={number + 1}
							totalQuestions={TOTAL_QUESTIONS}
							question={questions[number].question}
							answers={questions[number].answers}
							userAnswer={userAnswers ? userAnswers[number] : undefined}
							callback={checkAnswer}
						/>
					)}

				{!gameOver &&
					number !== TOTAL_QUESTIONS - 1 &&
					!loading &&
					userAnswers.length === number + 1 && (
						<button
							onClick={nextQuestion}
							className="bg-yellow-200 hover:bg-yellow-500 p-2 mt-4 rounded"
						>
							Next
						</button>
					)}
			</div>
		</div>
	);
}

export default App;
