"use client";

import { Question } from "@/app/Models";
import { MouseEvent } from "react";

export function QuestionComponent({ params: { question, questionNumber } }: { params: { question: Question; questionNumber: number } }) {
	function onClick(e: MouseEvent<HTMLElement>) {
		for (let a of e.currentTarget.children) {
			if (a.classList.contains("answer") && a.classList.contains("show")) {
				a.classList.remove("show");
			} else if (a.classList.contains("answer")) {
				a.classList.add("show");
			}
		}
	}
	return (
		<div className="question" key={question.id}>
			<div className="question-content" onClick={onClick}>
				<div>{questionNumber}:&nbsp;</div> <div>{question.question}</div>
				<div className="answer">
					<div className="title">answer:&nbsp;</div> &nbsp;{question.answer}
				</div>
			</div>
		</div>
	);
}

export default Question;
