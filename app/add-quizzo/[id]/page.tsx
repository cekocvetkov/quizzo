import { QuizzoWithQuestions, questionCreateInput } from "@/app/Models";
import prisma from "@/db/PrismaClient";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import SubmitButton from "../SubmitButton";

async function getQuizzoForEdit(quizzoId: number): Promise<QuizzoWithQuestions> {
	console.log(`For Edit: Getting quizzo with id ${quizzoId} from the server...`);
	const quizzo: any = await prisma.quizzo.findUnique({
		where: {
			id: +quizzoId,
		},
		include: { questions: true },
	});

	return quizzo;
}

async function disconnectQuestionFromQuizzo(quiestionId: number, quizzoId: number) {
	console.log(`Removing question ${quiestionId} from quizzo ${quizzoId}`);
	await prisma.question.update({
		where: { id: +quiestionId },
		data: {
			quizzo: {
				disconnect: { id: +quizzoId },
			},
		},
	});
}

async function editQuizzoDBCalls(quizzoId: number, quizzoName: string, quizzoDate: Date, questionsMap: Map<number, questionCreateInput>) {
	prisma.$transaction(async (prisma) => {
		// Step 1: Update the quizzo record
		const updatedQuizzo = await prisma.quizzo.update({
			where: { id: +quizzoId },
			data: {
				name: quizzoName,
				date: quizzoDate,
			},
		});

		// Step 2: Create or update the dependent questions
		for (const [key, question] of questionsMap) {
			if (question.question === "" && question.answer === "" && question.category === "" && question.id === undefined) {
				continue;
			} else if (question.question === "" && question.answer === "" && question.category === "" && question.id != undefined) {
				disconnectQuestionFromQuizzo(question.id, quizzoId);
				continue;
			}
			const { id, ...questionWithoutId } = question;

			// If the question has an 'id', it means it already exists, so update it
			if (question.id) {
				await prisma.question.update({
					where: { id: +question.id },
					data: questionWithoutId,
				});
			} else {
				// If the question doesn't have an 'id', it means it's a new question, so create it
				await prisma.question.create({
					data: {
						...questionWithoutId,
						quizzo: {
							connect: { id: +quizzoId },
						},
					},
				});
			}
		}

		return updatedQuizzo;
	});
}

async function EditQuizzo({ params: { id } }: { params: { id: number } }) {
	let quizzo: QuizzoWithQuestions = await getQuizzoForEdit(id);

	async function editQuizzo(formData: FormData) {
		"use server";
		console.log(`Edit quizzo with name: ${formData.get("quizzoName")}`);
		const quizzoName: string = formData.get("quizzoName")!.valueOf().toString();
		const quizzoDate = new Date(formData.get("quizzoDate")!.valueOf().toString());

		const questionsMap = new Map<number, questionCreateInput>();

		for (let [key, value] of formData) {
			// formData.forEach((value, key) => {
			if (!key.startsWith("question") && !key.startsWith("answer") && !key.startsWith("category") && !key.startsWith("id")) {
				continue;
			}
			const index = parseInt(key.replace(/[^0-9]/g, ""));
			let questionObject: any;
			if (!questionsMap.get(index)) {
				questionObject = {};
			} else {
				questionObject = questionsMap.get(index)!;
			}
			const property = key.replace(/[0-9]/g, "");

			if (property === "id") {
				questionObject[property] = Number.isNaN(parseInt(value.toString())) ? undefined : parseInt(value.toString());
			} else {
				questionObject[property] = value.toString();
			}
			questionsMap.set(index, questionObject);
		}

		let quizzoId = id;

		editQuizzoDBCalls(quizzoId, quizzoName, quizzoDate, questionsMap);

		revalidatePath("/");
		redirect("/");
	}

	function renderQuestionInputs() {
		let inputs = [];
		for (let i = 1; i <= 20; i++) {
			// if (!quizzo.questions[i - 1]) {
			// 	continue;
			// }

			inputs.push(
				<div key={`q${i}`} className="question-inputs-wrapper">
					<input defaultValue={quizzo.questions[i - 1]?.question} key={`question${i}`} className="add-input question-input questi" name={`question${i}`} type="text" placeholder={`Question ${i}`} />
					<input defaultValue={quizzo.questions[i - 1]?.answer} key={`answer${i}`} className="add-input question-input" name={`answer${i}`} type="text" placeholder={`Answer ${i}`} />
					<input defaultValue={quizzo.questions[i - 1]?.category} key={`category${i}`} className="add-input question-input" name={`category${i}`} type="text" placeholder={`Category ${i}`} />
					<input type="hidden" name={`id${i}`} value={quizzo.questions[i - 1]?.id} />
				</div>
			);
		}

		return inputs;
	}

	return (
		<>
			<div>It's the quiz {quizzo.name}</div>
			<form action={editQuizzo}>
				<div className="quizzo-form">
					<div className="quizzo-inputs">
						<div className="quizzo-inputs-without-button">
							<input defaultValue={quizzo.name} required className="add-input" type="text" name="quizzoName" placeholder="Quizka Name" />
							<input defaultValue={quizzo.date.toLocaleDateString("en-CA")} required className="add-input" type="date" name="quizzoDate" placeholder="Quizka Date" />
						</div>
						<SubmitButton props={{ buttonText: "save changes" }}></SubmitButton>
					</div>

					{quizzo.questions ? renderQuestionInputs() : <></>}
				</div>
			</form>
		</>
	);
}

export default EditQuizzo;
