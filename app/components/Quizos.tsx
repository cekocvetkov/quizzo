import prisma from "@/db/PrismaClient";
import Link from "next/link";
import { Quizzo } from "../Models";
import Delete from "./delete/Delete";

async function getAllQuizzos(): Promise<Quizzo[]> {
	"use server";

	console.log("Fetching quizzos from db...");
	const quizzos: Quizzo[] = await prisma.quizzo.findMany({ include: { questions: false } });

	// simmulate longer loading state for debugging the loading component
	// await new Promise((resolve) => setTimeout(resolve, 100000));

	return quizzos;
}

export default async function Quizzos() {
	const quizzos = await getAllQuizzos();
	return (
		<div className="quizzos-body">
			<div className="quizzos-wrapper">
				{quizzos.map((quizzo: Quizzo) =>
					!quizzo.id ? (
						<></>
					) : (
						<Link href={`/quizzos/${quizzo.id}`} key={quizzo.id} className="quizzo">
							<div>{quizzo.date?.toLocaleDateString()}</div>
							<div>{quizzo.name}</div>
							<Delete
								params={{
									quizzoId: quizzo.id,
								}}
							></Delete>
						</Link>
					)
				)}
			</div>
		</div>
	);
}
