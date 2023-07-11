<script lang="ts">
	import { error } from '@sveltejs/kit';
	import CoinIcon from '../../../components/icons/CoinIcon.svelte';
	import ExpIcon from '../../../components/icons/ExpIcon.svelte';
	import type { PageData, ActionData } from './$types';
	import { modalStore, type ModalSettings } from '@skeletonlabs/skeleton';

	export let data: PageData;

	export let form: ActionData;
	const rewardModal: ModalSettings = {
		type: 'alert',
		// Data
		title: 'Quest completed',
		body: `
		<p class="text-green-700">
			${form?.message}
		</p>
		`,
		response: (r: boolean) => {
			window.location.reload();
		}
	};
	$: {
		if (form?.success) {
			modalStore.trigger(rewardModal);
		}
	}
</script>

{#if form}
	{#if !form?.success}
		<p class="text-red-700">
			{form?.message}
		</p>
	{:else}
		<p class="text-green-700">
			{form?.message}
		</p>
	{/if}
{/if}

<div
	class="grid grid-cols-1 gap-3
md:grid-cols-2
lg:grid-cols-3
xl:grid-cols-4
2xl:grid-cols-5"
>
	{#each data.allQuests as quest}
		<div
			class={`border-2 border-black ${
				data.user?.completedQuestUniques.includes(quest.uniqueChecker) ? 'grayscale' : ''
			}
			${
				!data.user?.completedQuestUniques.includes(quest.uniqueChecker) &&
				data.user.level < quest.requiredQuestLevel
					? 'grayscale'
					: ''
			}

		`}
		>
			<img src={`/quest_images/${quest.image}`} alt={quest.title} />
			<div class="quest-section h-24">
				<!--<audio controls class="w-full">
					<source src="/audio/quest_complete.mp3" type="audio/ogg" />

					Your browser does not support the audio element.
				</audio>-->
				<h1>{quest.title}</h1>
				<p>{quest.description}</p>
			</div>

			<div class="rewards flex flex-col gap-1">
				<p class="flex gap-1 items-center">
					<CoinIcon width="w-10" height="h-10" />

					{quest.questGold}
				</p>
				<p class="flex gap-1 items-center">
					<ExpIcon width="w-10" height="h-10" />
					{quest.questExp}
				</p>
			</div>

			{#if !data.user?.completedQuestUniques.includes(quest.uniqueChecker) && data.user.level >= quest.requiredQuestLevel}
				<form method="POST" action="?/finishQuest">
					<input type="hidden" name="questId" value={quest.id} />
					<button
						type="submit"
						class="w-full bg-blue-500 hover:bg-blue-400 text-white font-bold p-3 border-b-4 border-blue-700 hover:border-blue-500 rounded"
					>
						Finish Quest
					</button>
				</form>
			{:else if data.user?.completedQuestUniques.includes(quest.uniqueChecker)}
				<p
					class="w-full bg-blue-500 hover:bg-blue-400 text-white font-bold p-3 border-b-4 border-blue-700 hover:border-blue-500 rounded"
				>
					Completed
				</p>
			{:else if data.user?.level < quest.requiredQuestLevel}
				<p
					class="w-full bg-blue-500 hover:bg-blue-400 text-white font-bold p-3 border-b-4 border-blue-700 hover:border-blue-500 rounded"
				>
					Level {quest.requiredQuestLevel} Required
				</p>
			{/if}
		</div>
	{/each}
</div>
