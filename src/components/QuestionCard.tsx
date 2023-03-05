import React, { useId } from "react";
import { AnswerObject } from "../App";

interface Props {
	question: string;
	answers: string[];
	callback: (e: React.MouseEvent<HTMLButtonElement>) => void;
	userAnswer: AnswerObject | undefined;
	questionNumber: number;
	totalQuestions: number;
}

const QuestionCard: React.FC<Props> = ({
	question,
	answers,
	callback,
	userAnswer,
	questionNumber,
	totalQuestions,
}) => {
	return (
		<div>
			<p className="my-4">
				Question: {questionNumber} / {totalQuestions}
			</p>
			<p className="p-6 text-lg">" {question} "</p>
			<div className="flex flex-col gap-4">
				{answers.map((answer, idx) => (
					<div key={idx}>
						<button
							disabled={userAnswer ? true : false}
							value={answer}
							onClick={callback}
							className="bg-purple-200 hover:bg-purple-300 p-4 w-full"
						>
							<span>{answer}</span>
						</button>
					</div>
				))}
			</div>
		</div>
	);
};

export default QuestionCard;
