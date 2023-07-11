<script>
	import DiscordIcon from '../components/icons/DiscordIcon.svelte';

	// Your selected Skeleton theme:
	import '@skeletonlabs/skeleton/themes/theme-skeleton.css';

	// This contains the bulk of Skeletons required styles:
	import '@skeletonlabs/skeleton/styles/skeleton.css';

	// Finally, your application's global stylesheet (sometimes labeled 'app.css')
	import './styles.css';
	import { Modal, modalStore } from '@skeletonlabs/skeleton';
</script>

<Modal />
<div class="app">
	<main>
		<DiscordIcon />
		<slot />
	</main>
</div>
