"use server";

import prisma from "@/db/PrismaClient";
import { revalidatePath } from "next/cache";

export async function deleteQuizzo(quizzoId: number) {
	console.log(`Deleting quizzo with id ${quizzoId}`);

	//simmulate slower deletion to see the loading animation
	await new Promise((resolve) => setTimeout(resolve, 1000));

	const deleteUser = await prisma.quizzo.delete({
		where: {
			id: quizzoId,
		},
	});

	revalidatePath("/");
}
