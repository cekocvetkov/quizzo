import prisma from "@/db/PrismaClient";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { Question } from "../Models";
import SubmitButton from "./SubmitButton";

function page() {
	async function addQuizzo(formData: FormData) {
		"use server";

		console.log(`Adding quizzo with name: ${formData.get("quizzoName")}`);
		await new Promise((resolve) => setTimeout(resolve, 2000));

		const quizzoName: string = formData.get("quizzoName")!.valueOf().toString();
		const quizzoDate = new Date(formData.get("quizzoDate")!.valueOf().toString());

		const questions: Question[] = [];
		let q: Question = { question: "", answer: "", category: "" };
		formData.forEach((value, key) => {
			if (key.startsWith("question")) {
				q.question = value.toString();
			}
			if (key.startsWith("answer")) {
				q.answer = value.toString();
			}
			if (key.startsWith("category")) {
				q.category = value.toString();
				if (q.question || q.answer || q.category) {
					questions.push(q);
					q = { question: "", answer: "", category: "" };
				}
			}
		});
		const quizzo = await prisma.quizzo.create({
			data: {
				name: quizzoName,
				date: quizzoDate,
				questions: {
					create: questions,
				},
			},
		});

		revalidatePath("/");
		redirect("/");
	}

	function renderQuestionInputs() {
		let inputs = [];
		for (let i = 1; i <= 20; i++) {
			inputs.push(
				<div className="question-inputs-wrapper">
					<input key={`question${i}`} className="add-input question-input questi" name={`question${i}`} type="text" placeholder={`Question ${i}`} />
					<input key={`answer${i}`} className="add-input question-input" name={`answer${i}`} type="text" placeholder={`Answer ${i}`} />
					<input key={`category${i}`} className="add-input question-input" name={`category${i}`} type="text" placeholder={`Category ${i}`} />
				</div>
			);
		}

		return inputs;
	}
	return (
		<>
			<form action={addQuizzo}>
				<div className="quizzo-form">
					<div className="quizzo-inputs">
						<div className="quizzo-inputs-without-button">
							<input required className="add-input" type="text" name="quizzoName" placeholder="Quizka Name" />
							<input required className="add-input" type="date" name="quizzoDate" placeholder="Quizka Date" />
						</div>
						<SubmitButton></SubmitButton>
					</div>
					{renderQuestionInputs()}
				</div>
			</form>
		</>
	);
}

export default page;
