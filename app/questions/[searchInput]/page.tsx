import { EMPTY_SEARCH_TOKEN, Question } from "@/app/Models";
import prisma from "@/db/PrismaClient";

async function findQuestions(searchInput: string) {
	if (searchInput === EMPTY_SEARCH_TOKEN) {
		const questionsAll: Question[] = await prisma.question.findMany();
		return questionsAll;
	}

	const questions: Question[] = await prisma.question.findMany({
		where: {
			OR: [
				{
					question: {
						contains: searchInput,
					},
				},
				{ answer: { contains: searchInput } },
				{ category: { contains: searchInput } },
			],
		},
	});

	return questions;
}

async function QuestionsSearchInputResult({
	params: { searchInput },
}: {
	params: {
		searchInput: string;
	};
}) {
	const questions: Question[] = await findQuestions(searchInput);

	return (
		<>
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
		</>
	);
}

export default QuestionsSearchInputResult;
