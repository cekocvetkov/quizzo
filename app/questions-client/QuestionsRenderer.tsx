import { Question } from "../Models";

function QuestionsRenderer({ questions }: { questions: Question[] }) {
	return (
		<div className="questions-wrapper">
			{questions.length != 0 ? (
				questions.map((question, i) => (
					<div className="question" key={question.id}>
						<div className="question-content">
							<div>{i + 1}:&nbsp;</div> <div>{question.question}</div>
							<div className="answer-visible">
								<div className="title">answer:&nbsp;</div> &nbsp;{question.answer}
							</div>
						</div>
					</div>
				))
			) : (
				<div> no questions here, sorry </div>
			)}
		</div>
	);
}

export default QuestionsRenderer;
