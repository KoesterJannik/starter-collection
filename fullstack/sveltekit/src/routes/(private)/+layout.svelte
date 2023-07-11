<script>
	import AuthHeader from '../../components/AuthHeader.svelte';
</script>

<div class="bg-dash min-h-screen">
	<AuthHeader />
	<div class="container mx-auto">
		<slot />
	</div>
</div>

<style>
	.bg-dash {
		background-image: url('/bg-dash.png');
		background-repeat: no-repeat;
		background-size: cover;
		background-position: center;
		opacity: 0.9;
	}
</style>
