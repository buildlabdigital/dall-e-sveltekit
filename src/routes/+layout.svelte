<script>
	import '../app.postcss';
	import { Navbar } from '$lib/components';
	import Footer from '$lib/components/footer.svelte';
</script>

<Navbar />

<div class="h-screen pt-20 px-6">
	<div class="h-full">
		<slot />
	</div>
</div>
