<script lang="ts">
	import type { FightLogs } from '$lib/$server/monsters';
	import type { PageData } from './$types';
	import { onMount, onDestroy } from 'svelte';
	import { goto } from '$app/navigation';
	import { fade } from 'svelte/transition';

	export let data: PageData;
	import { modalStore, type ModalSettings } from '@skeletonlabs/skeleton';
	const modalWon: ModalSettings = {
		type: 'alert',
		// Data
		title: 'You have won',
		body: `
		<p class="text-green-400">You have won the fight. You received</p>
		<ul>
			<li>${data.receivedExp} Experience</li>
			<li>${data.receivedGold} Gold</li>
		</ul>
		${data.isLevelUp ? '<p class="text-green-400">You have leveled up</p>' : ''}
		`,
		response: (r: boolean) => {
			goto('/dashboard');
		}
	};
	const modalLost: ModalSettings = {
		type: 'alert',
		// Data
		title: 'You have lost',
		body: `
		<p class="text-red-400">You have lost the fight</p>
		`,
		response: (r: boolean) => {
			goto('/dashboard');
		}
	};

	let isFighting = false;
	let currentRoundIndex = 0;
	let fightResults: string[] = [];
	let roundResult: FightLogs | undefined;
	let intervalId: any;

	let maxPlayerLife = data.user.life; // this is 100% of the life bar
	let playerSimulationLife = data.user.life; // this is the life that will be simulated
	let maxMonsterLife = data.startMonsterHp || 80; // this is 100% of the life bar
	let monsterSimulationLife = data.startMonsterHp || 80; // this is 100% of the life bar
	let showFighResult = false;

	$: playerLifePercentage = (playerSimulationLife * 100) / maxPlayerLife;
	$: npcLifePercentage = (monsterSimulationLife * 100) / maxMonsterLife;
	$: totalUserPoints =
		data.user.life + data.user.strength + data.user.intelligence + data.user.dexterity;

	function startFight() {
		if (data?.fightLogs && data.fightLogs.length > 0) {
			isFighting = true;
			currentRoundIndex = 0;
			fightResults = [];

			const intervalId = setInterval(() => {
				if (currentRoundIndex < data!.fightLogs!.length) {
					const f = data!.fightLogs[currentRoundIndex];
					fightResults = [...fightResults, f];
					roundResult = f;
					playerSimulationLife -= f.dealtMonsterDamage;
					monsterSimulationLife -= f.dealtPlayerDamage;
					currentRoundIndex++;
				} else {
					clearInterval(intervalId);
					isFighting = false;
					if (data.userWon) {
						modalStore.trigger(modalWon);
					} else {
						modalStore.trigger(modalLost);
					}
					showFighResult = true;
				}
			}, 1000);
		}
	}

	onMount(() => {
		// Reset fight results on component mount
		fightResults = [];
	});

	onDestroy(() => {
		// Clean up interval on component destroy
		clearInterval(intervalId);
	});
</script>

<div>
	{#if !data?.error}
		<div class="flex justify-center">
			<button on:click={startFight} disabled={isFighting} class="btn btn-xl variant-ghost">
				{#if isFighting}
					<span>Fighting...</span>
				{:else}
					<span>Start Fight</span>
				{/if}
			</button>
		</div>
	{/if}

	{#if isFighting}
		<div class="board flex gap-4 justify-center">
			<div class="player bg-slate-600">
				<img src={`/classes/${data.user.race.toLowerCase()}.png`} alt="Roque" class="h-48 w-48" />
				<div class="details-section">
					<p class="text-md text-center">
						{data.user.username}
					</p>
					<p class="text-md text-center">
						{data.user.level}
					</p>
					<div class="life-bar">
						<div class="bg-red-500 h-2" style={`width: ${playerLifePercentage}%`} />
					</div>
					<p class="text-sm">
						Life: {data.user.life}
					</p>
					<p class="text-sm">
						Strength: {data.user.strength}
					</p>
					<p class="text-sm">
						Intelligence: {data.user.intelligence}
					</p>
					<p class="text-sm">
						Dexterity: {data.user.dexterity}
					</p>
					<p class="text-sm">
						Total Power: {totalUserPoints}
					</p>
				</div>
			</div>
			<div class="enemy bg-slate-600">
				<img src={`/monsters/${data.randomMonsterImage}`} alt="monster" class="h-48 w-48" />
				<div class="details-section">
					<p class="text-md text-center">
						{data.randomMonsterName}
					</p>
					<p class="text-md text-center">
						{data.user.level}
					</p>
					<div class="life-bar">
						<div class="bg-red-500 h-2" style={`width: ${npcLifePercentage}%`} />
					</div>
				</div>
			</div>
		</div>
		<div class="result-board bg-stone-600 w-48 mx-auto" transition:fade>
			<p>{roundResult?.msg}</p>
		</div>
	{/if}
	{#if showFighResult}
		{#if data.userWon}
			you won
		{:else}
			you los
		{/if}
	{/if}

	{#if data?.error}
		<p class="text-4xl h-screen flex flex-col justify-center items-center">
			You have to wait a little bit before you can fight again
		</p>
	{/if}
</div>
