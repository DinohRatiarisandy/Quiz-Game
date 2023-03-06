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
	// console.log(questions);
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
	// console.log(gameOver);
	return (
		<div className="App h-[100vh] flex bg-black-dark text-gray-default">
			<div className="w-[700px] mx-auto my-auto h-[95%] justify-around bg-black-light rounded-lg p-6 flex flex-col items-center">
				<div className="w-full h-full text-center flex flex-col justify-between items-center">
					<div>
						<h1 className="p-6 font-dancing text-7xl mb-[] border-b border-b-gray-border text-[#dfe0fd]">
							QUIZZZZ ????
						</h1>
					</div>
					{gameOver ||
					(userAnswers.length === TOTAL_QUESTIONS && !loading) ? (
						<button
							className="bg-green-300 hover:bg-green-500 p-2 mb-4 rounded"
							onClick={startTrivia}
						>
							{userAnswers.length === TOTAL_QUESTIONS ? (
								<p className="btn p-2 flex items-center justify-center rounded-lg">
									Restart
								</p>
							) : (
								<p className="btn p-2 flex items-center justify-center rounded-lg">
									Start
								</p>
							)}
						</button>
					) : null}

					{!gameOver && !loading ? (
						<p>
							<span className="text-xl text-[#d8da89] mr-2">Score:</span>{" "}
							<span className="text-2xl">{score}</span>
						</p>
					) : (
						<p>
							<span className="text-xl text-[#d8da89] mr-2">
								Last score:{" "}
							</span>{" "}
							<span className="text-2xl">{score}</span>
						</p>
					)}
				</div>

				{/* Loading spinner */}
				{loading && (
					<div className="w-full h-full mb-[50px] flex flex-col items-center">
						<p className="loading-spinner mt-4"></p>
						<p className="mt-3">Loading questions...</p>
					</div>
				)}

				{!loading && !gameOver && (
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
				userAnswers[number] !== undefined ? (
					<button onClick={nextQuestion} className="rounded btn p-2 mt-4">
						Next
					</button>
				) : (
					<button className="h-[55px] w-[200px] p-2 mt-4 opacity-0">
						Next
					</button>
				)}
			</div>
		</div>
	);
}

export default App;
