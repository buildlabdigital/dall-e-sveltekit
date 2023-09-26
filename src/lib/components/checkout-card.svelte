<script lang="ts">
	import { Button, buttonVariants } from '$lib/components/ui/button';
	import * as Dialog from '$lib/components/ui/dialog';
	import * as Card from '$lib/components/ui/card';
	import { Coins, IndianRupee, Minus, Plus } from 'lucide-svelte';
	import { cn } from '$lib/utils';
	import { Input } from '$lib/components/ui/input';

	type UserDataType = {
		id: string;
		name: string | null;
		email: string | null;
		emailVerified: Date | null;
		image: string | null;
		credits: number;
		costPerCredit: number;
	} | null;

	export let costPerCredit: number;
	export let userData: UserDataType;
	let credits: number = 10;

	const blockInvalidChar = (e: KeyboardEvent) =>
		['e', 'E', '+', '-'].includes(e.key) && e.preventDefault();
</script>

<Dialog.Root>
	<Dialog.Trigger class={cn('mt-4', buttonVariants({ variant: 'outline' }))}>
		<Coins class="mr-2" />
		Purchase Credits
	</Dialog.Trigger>
	<Dialog.Content>
		<Dialog.Header>
			<Dialog.Title>
				<div class="flex items-center">
					Purchase Credits <Coins class="ml-3" />
				</div>
			</Dialog.Title>
			<Dialog.Description>Purchase Credits to generate more Images.</Dialog.Description>
		</Dialog.Header>
		<Card.Root class="border-0 shadow-none">
			<Card.Header class="pb-4">
				<Card.Title class="text-base">Number of Credits</Card.Title>
			</Card.Header>
			<Card.Content class="pb-2">
				<div class="flex items-center justify-center space-x-2">
					<Button
						variant="outline"
						size="icon"
						class="h-8 w-8 shrink-0 rounded-full"
						on:click={() => {
							credits = Number(credits) - 10;
						}}
						disabled={+credits <= 10}
					>
						<Minus class="h-4 w-4" />
						<span class="sr-only">Decrease</span>
					</Button>
					<div class="flex-1 text-center">
						<div class="text-5xl font-bold tracking-tighter flex items-center justify-center">
							<Input
								type="number"
								class="w-auto text-center mt-3"
								bind:value={credits}
								min="0"
								name="credits"
								autofocus={false}
								on:keydown={blockInvalidChar}
								on:change={() => {
									if (credits < 0 || typeof credits !== 'number') {
										credits = 0;
									}
								}}
								on:mouseleave={() => {
									if (credits < 0 || typeof credits !== 'number') {
										credits = 0;
									}
								}}
							/>
						</div>
						<div class="text-[0.70rem] uppercase text-muted-foreground mt-1">Credits</div>
					</div>
					<Button
						variant="outline"
						size="icon"
						class="h-8 w-8 shrink-0 rounded-full"
						on:click={() => {
							credits = Number(credits) + 10;
						}}
					>
						<Plus class="h-4 w-4" />
						<span class="sr-only">Increase</span>
					</Button>
				</div>
			</Card.Content>
			<Card.Footer>
				<Button class="w-full" disabled={credits <= 0} type="submit">
					<div class="flex items-center justify-between w-full">
						<div>Checkout</div>
						<div class="flex items-center gap-1">
							<IndianRupee size={15} />
							{costPerCredit * credits}
						</div>
					</div>
				</Button>
			</Card.Footer>
		</Card.Root>
	</Dialog.Content>
</Dialog.Root>