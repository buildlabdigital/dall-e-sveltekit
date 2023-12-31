import { redirect, type Actions, fail } from "@sveltejs/kit";
import type { PageServerLoad } from "./$types";
import { superValidate } from "sveltekit-superforms/server";
import { imageFormSchema } from "./constants";
import { OPENAI_API_KEY } from "$env/static/private";
import { db } from "$lib/db.server";
import OpenAI from "openai";

const openai = new OpenAI({
	apiKey: OPENAI_API_KEY,
});

const getUserData = async (email: string) => {
	return await db.user.findUnique({
		where: {
			email: email,
		},
	});
};

enum Resolution {
	RES_256 = "256x256",
	RES_512 = "512x512",
	RES_1024 = "1024x1024",
}

const creditsNeeded = (count: number, resolution: Resolution) => {
	// base cost is 1 credit per image
	let cost = count;
	if (resolution === Resolution.RES_512) {
		cost += 2;
	} else if (resolution === Resolution.RES_1024) {
		cost += 3;
	}
	return cost;
};

type ImageSizes = "256x256" | "512x512" | "1024x1024";
function convertToImageType(inputValue: string): ImageSizes {
	const imageSize: ImageSizes = inputValue as ImageSizes;
	return imageSize;
}

export const load: PageServerLoad = async (event) => {
	const session = await event.locals.getSession();
	const fromUrl = event.url.pathname + event.url.search;
	if (!session?.user) {
		throw redirect(303, `/login?redirectTo=${fromUrl}`);
	}

	const userData = await getUserData(session.user.email as string);

	return {
		session,
		form: superValidate(imageFormSchema),
		userData,
	};
};

export const actions: Actions = {
	default: async (event) => {
		const form = await superValidate(event, imageFormSchema);
		if (!form.valid) {
			return fail(400, {
				form,
				error: "Invalid form data",
			});
		}

		const { prompt, count, resolution } = form.data;
		console.log(form.data);
		console.log(prompt, count, resolution);

		// calculate the credits needed
		const credits = creditsNeeded(Number(count), resolution as Resolution);
		console.log(credits);

		// check if user has enough credits
		const session = await event.locals.getSession();
		const userData = await getUserData(session?.user?.email as string);

		if (userData?.credits !== undefined && userData?.credits < credits) {
			return fail(400, {
				form,
				creditsError: "Not enough credits",
				availableCredits: userData?.credits,
				creditsNeeded: credits,
			});
		}

		const image = await openai.images.generate({
			prompt: prompt,
			n: Number(count),
			size: convertToImageType(resolution),
		});

		// decrement user's credits
		await db.user.update({
			where: {
				email: session?.user?.email as string,
			},
			data: {
				credits: {
					decrement: credits,
				},
			},
		});

		console.log(image.data);
		return { form, prompt, count, resolution, image };
	},
};
