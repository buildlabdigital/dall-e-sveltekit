<script lang="ts">
	import { page } from '$app/stores';
	import { Footer } from '$lib/components';
	import { AuthJS, MySQL, Prisma, Svelte, TypeScript } from '$lib/components/icons';
	import Openai from '$lib/components/icons/openai.svelte';
	import * as Avatar from '$lib/components/ui/avatar';
	import { Button } from '$lib/components/ui/button';
	import * as Card from '$lib/components/ui/card';
</script>

<div class="flex items-center justify-center h-full overflow-x-hidden -mt-6">
	<Card.Root class="w-[400px]">
		<Card.Header>
			<div class="flex items-center justify-between">
				<div class="space-y-1">
					<Card.Title>Dall-E Clone</Card.Title>
					<Card.Description>This App is made with SvelteKit by @prabhukirankonda</Card.Description>
				</div>
				<div>
					<Avatar.Root>
						<Avatar.Image src="profile_picture.jpg" alt="@shadcn" />
					</Avatar.Root>
				</div>
			</div>
		</Card.Header>
		<Card.Content class="grid gap-4">
			<h1>Tech Stack Used</h1>
			<div class="flex items-center space-x-4 rounded-md border p-4">
				<Svelte className="h-10 w-10" />
				<TypeScript className="h-10 w-10" />
				<MySQL className="h-10 w-10" />
				<Prisma />
				<Openai />
				<AuthJS />
			</div>
		</Card.Content>
		<Card.Footer>
			<!-- <Button class="w-full">Mark all as read</Button> -->
		</Card.Footer>
	</Card.Root>
</div>
<div class="absolute bottom-0 w-full p-3">
	<Footer />
</div>
