import { PrismaClient } from "@prisma/client";
import { SAMPLE_QUESTIONS } from "./sample-questions";

const prisma = new PrismaClient();

async function main() {
	try {
		const quizzes = await generateQuizzes();
		for (const quiz of quizzes) {
			const questions = SAMPLE_QUESTIONS;
			let i = 0;
			for (let j = i; j < i + 20; j++) {
				const randomQuestion = questions[j];
				const question = await prisma.question.create({
					data: {
						...randomQuestion,
						quizzoId: quiz.id,
					},
				});

			}
			i += 20;
			console.log(`Quiz ${quiz.name} created with 20 questions.`);
		}
	} catch (error) {
		console.error(error);
	} finally {
		await prisma.$disconnect();
	}
}

// execute the main function
main()
	.catch((e) => {
		console.error(e);
		process.exit(1);
	})
	.finally(async () => {
		// close Prisma Client at the end
		await prisma.$disconnect();
	});

async function generateQuizzes() {
	const quizzes = [];
	const quiz1Data = {
		name: `Trivia masters`,
		date: new Date(),
		updatedAt: new Date(),
	};
	const quiz2Data = {
		name: `Late night questions fight`,
		date: new Date(),
		updatedAt: new Date(),
	};
	const quiz3Data = {
		name: `Quiz Wizards`,
		date: new Date(),
		updatedAt: new Date(),
	};
	const quiz4Data = {
		name: `Mind Benders`,
		date: new Date(),
		updatedAt: new Date(),
	};
	const quiz5Data = {
		name: `Knowledge Quest`,
		date: new Date(),
		updatedAt: new Date(),
	};
	const quiz6Data = {
		name: `Mind Olympics`,
		date: new Date(),
		updatedAt: new Date(),
	};
	const quiz1 = await prisma.quizzo.create({
		data: quiz1Data,
	});
	const quiz2 = await prisma.quizzo.create({
		data: quiz2Data,
	});
	const quiz3 = await prisma.quizzo.create({
		data: quiz3Data,
	});
	const quiz4 = await prisma.quizzo.create({
		data: quiz4Data,
	});
	const quiz5 = await prisma.quizzo.create({
		data: quiz5Data,
	});
	const quiz6 = await prisma.quizzo.create({
		data: quiz6Data,
	});
	quizzes.push(quiz1);
	quizzes.push(quiz2);
	quizzes.push(quiz3);
	quizzes.push(quiz4);
	quizzes.push(quiz5);
	quizzes.push(quiz6);
	return quizzes;
}
