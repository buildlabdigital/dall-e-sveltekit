<script>
	import { page } from '$app/stores';
	import { Gallery } from '$lib/components';
	import { Sparkles } from 'lucide-svelte';

	const images1 = [
		{
			alt: 'shoes',
			src: 'A bowl of soup that is also a portal to another dimension, digital art.webp'
		},
		{ alt: 'small bag', src: '0_1_384_N.webp' },
		{ alt: 'erbology', src: '0_3_384_N_robot.webp', class: 'h-full w-full' }
	];
	const images2 = [
		{ alt: 'watch', src: '0_0_384_N_flower.webp', class: 'h-full w-full' },
		{ alt: 'plants', src: 'A van Gogh style painting of an American football player.webp' },
		{ alt: 'shoe', src: 'A cyberpunk monster in a control room.webp' }
	];
	const images3 = [
		{
			alt: 'lamp',
			src: '0_1_384_N_flowers_fruits.webp'
		},
		{ alt: 'cream', src: '0_0_384_N_sky.webp', class: 'h-96 w-full' }
		// { alt: 'small bag', src: '0_1_384_N_cat.webp', class: '' },
	];
	const images4 = [
		{ alt: 'toiletbag', src: 'A cartoon of a monkey in space.webp', class: 'h-full w-full' },
		{
			alt: 'playstation',
			src: '0_0_384_N.webp'
		},
		{ alt: 'bag', src: 'A computer from the 90s in the style of vaporwave.webp' }
	];
</script>

<div class="flex flex-col items-center h-full gap-6 lg:flex-row md:justify-center lg:space-y-6">
	<div class="flex flex-col gap-6 mx-4 mt-10 mb-4 text-center md:mt-28 lg:mt-20 lg:p-20">
		<h1 class="text-3xl font-extrabold md:text-5xl lg:text-6xl">AI Image Generation</h1>
		<p>Turn your imagination into awesome pictures</p>
		<a
			href={$page.data.session ? '/dashboard' : '/login'}
			class="buttonClass flex items-center justify-center"
		>
			Get Started
			<Sparkles class="ml-2" />
		</a>
	</div>
	<Gallery class="gap-[12px] grid-cols-2 md:grid-cols-4 lg:mb-0 w-auto -mx-2 lg:px-28">
		<Gallery items={images1} />
		<Gallery items={images2} />
		<Gallery items={images3} />
		<Gallery items={images4} />
	</Gallery>

	<div class="h-20 lg:hidden mt-2">
		<h1 class="invisible">hidden</h1>
	</div>
</div>
