import React from "react";
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
		<div className="h-full w-full flex flex-col justify-between">
			<p className="my-4 ml-6">
				<span className="text-xl mr-2 text-[#d8da89]">Question:</span>{" "}
				<span className="text-2xl">
					{questionNumber} / {totalQuestions}
				</span>
			</p>
			<p className="p-6 text-lg">" {question} "</p>
			<div className="flex flex-col gap-8 p-8 items-start mb-8">
				{answers.map((answer, idx) => (
					<div key={idx} className="w-full">
						<button
							disabled={userAnswer ? true : false}
							value={answer}
							onClick={callback}
							className={`p-4 border rounded border-gray-border w-full cursor-pointer bg-[#0a182cee] disabled:pointer-events-none ${
								userAnswer?.correctAnswer === answer
									? "bg-[#18502dc9]"
									: !(userAnswer?.correctAnswer === answer) &&
									  userAnswer?.answer === answer
									? "bg-[#611e1caf]"
									: "bg-gray-200"
							}`}
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
