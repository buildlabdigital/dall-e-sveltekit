<script>
	import { page } from '$app/stores';
</script>

<div class="p-20 text-center">
	{#if $page.data.session}
		<h1 class="text-center">
			Hey 👋, {$page.data.session.user?.name}
		</h1>
		<p>This page is under construction. will be ready very soon. stay tuned.</p>
	{/if}
</div>
