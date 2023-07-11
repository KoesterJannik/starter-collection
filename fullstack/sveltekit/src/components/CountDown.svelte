<script lang="ts">
	import { onMount, onDestroy } from 'svelte';

	export let startInMinutes = 0;
	let remainingSeconds = startInMinutes * 60;
	let intervalId;

	onMount(() => {
		intervalId = setInterval(() => {
			remainingSeconds--;
			if (remainingSeconds <= 0) {
				clearInterval(intervalId);
			}
		}, 1000);
	});

	onDestroy(() => {
		clearInterval(intervalId);
	});

	function formatTime(seconds) {
		const minutes = Math.floor(seconds / 60);
		const secondsRemainder = seconds % 60;
		return `${minutes}:${secondsRemainder < 10 ? '0' : ''}${secondsRemainder}`;
	}
</script>

<div>
	<h1>Countdown: {formatTime(remainingSeconds)}</h1>
</div>
