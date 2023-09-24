import { redirect, type Actions, fail } from '@sveltejs/kit';
import type { PageServerLoad } from './$types';
import { superValidate } from 'sveltekit-superforms/server';
import { imageFormSchema } from './constants';
import { OPENAI_API_KEY } from '$env/static/private';
import OpenAI from 'openai';

const openai = new OpenAI({
	apiKey: OPENAI_API_KEY
});

export const load: PageServerLoad = async (event) => {
	const session = await event.locals.getSession();
	const fromUrl = event.url.pathname + event.url.search;
	if (!session?.user) {
		throw redirect(303, `/login?redirectTo=${fromUrl}`);
	}

	return {
		session,
		form: superValidate(imageFormSchema)
	};
};

type ImageSizes = '256x256' | '512x512' | '1024x1024';
function convertToImageType(inputValue: string): ImageSizes {
	const imageSize: ImageSizes = inputValue as ImageSizes;
	return imageSize;
}

export const actions: Actions = {
	default: async (event) => {
		const form = await superValidate(event, imageFormSchema);
		if (!form.valid) {
			return fail(400, {
				form,
				error: 'Invalid form data'
			});
		}

		const { prompt, count, resolution } = form.data;
		console.log(form.data);
		console.log(prompt, count, resolution);
		const image = await openai.images.generate({
			prompt: prompt,
			n: Number(count),
			size: convertToImageType(resolution)
		});
		
		console.log(image.data);
		return { form, prompt, count, resolution, image };
	}
};
