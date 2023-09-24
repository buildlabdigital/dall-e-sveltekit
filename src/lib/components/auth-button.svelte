<script>
	import { page } from '$app/stores';
	import { signOut } from '@auth/sveltekit/client';
	import Button from './ui/button/button.svelte';
	import { userSession } from '$lib/store';
</script>

{#if !$page.data.session}
	<Button>
		<a href="/login"> Sign in </a>
	</Button>
{:else}
	<Button
		on:click={() => {
			userSession.set(null);
			signOut({
				callbackUrl: '/'
			});
		}}
		class="w-full">Sign out</Button
	>
{/if}
