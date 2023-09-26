<script lang="ts">
	import { page } from '$app/stores';
	import * as Avatar from '$lib/components/ui/avatar';
	import { Button } from '$lib/components/ui/button';
	import * as Card from '$lib/components/ui/card';
	import { Switch } from '$lib/components/ui/switch';

	const notifications = [
		{
			title: 'Your call has been confirmed.',
			description: '1 hour ago'
		},
		{
			title: 'You have a new message!',
			description: '1 hour ago'
		},
		{
			title: 'Your subscription is expiring soon!',
			description: '2 hours ago'
		}
	];
</script>

<div class="flex items-center justify-center h-full overflow-x-hidden">
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
			<div class="flex items-center space-x-4 rounded-md border p-4">
				<div class="flex-1 space-y-1">
					<p class="text-sm font-medium leading-none">Push Notifications</p>
					<p class="text-sm text-muted-foreground">Send notifications to device.</p>
				</div>
				<Switch />
			</div>
			<div>
				{#each notifications as notification, idx (idx)}
					<div class="mb-4 grid grid-cols-[25px_1fr] items-start pb-4 last:mb-0 last:pb-0">
						<span class="flex h-2 w-2 translate-y-1 rounded-full bg-sky-500" />
						<div class="space-y-1">
							<p class="text-sm font-medium leading-none">
								{notification.title}
							</p>
							<p class="text-sm text-muted-foreground">
								{notification.description}
							</p>
						</div>
					</div>
				{/each}
			</div>
		</Card.Content>
		<Card.Footer>
			<Button class="w-full">Mark all as read</Button>
		</Card.Footer>
	</Card.Root>
</div>
