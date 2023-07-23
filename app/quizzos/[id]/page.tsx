import { Question } from "@/app/Models";
import prisma from "@/db/PrismaClient";
import Link from "next/link";
import { QuestionComponent } from "./Question";

async function getQuestionsByQuizzoId(id: number): Promise<Question[]> {
	const questions: Question[] = await prisma.question.findMany({
		where: {
			quizzoId: parseInt(id),
		},
	});

	return questions;
}

async function Quizzo({ params: { id } }: { params: { id: number } }) {
	const questions: Question[] = await getQuestionsByQuizzoId(id);

	return (
		<>
			<div className="questions-wrapper">
				<Link className="edit-link" href={`/add-quizzo/${id}`}>
					edit this quiz
				</Link>
				{questions.length != 0 ? (
					questions.map((question, i) => (
						<div key={question.id}>
							<QuestionComponent params={{ question: question, questionNumber: i + 1 }}></QuestionComponent>
						</div>
					))
				) : (
					<div> no questions here, sorry </div>
				)}
			</div>
		</>
	);
}

export default Quizzo;
