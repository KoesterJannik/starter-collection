<script lang="ts">
	import { onMount } from 'svelte';
	import type { PageData } from './$types';

	export let data: PageData;

	let searchQuery = '';
	let filteredUsers: any = [];

	function handleSearch() {
		filteredUsers = data.allUsers.filter((user) =>
			user.username.toLowerCase().includes(searchQuery.toLowerCase())
		);
	}

	onMount(() => {
		filteredUsers = data.allUsers;
	});
</script>

<div class="search-area w-1/2 mx-auto p-4">
	<input
		type="text"
		placeholder="Search"
		class="rounded-md border border-gray-300 px-2 py-1 w-full"
		bind:value={searchQuery}
		on:input={handleSearch}
	/>
</div>

<div class="flex flex-wrap gap-3">
	{#each filteredUsers as user, i}
		<div class="flex flex-col">
			<img
				src={`/classes/${user.race.toLowerCase()}.png`}
				alt="Roque"
				class="rounded-full w-24 h-24"
			/>
			<div class="details">
				<p>
					# {i + 1}
				</p>
				<p>
					{user.username}
				</p>
				<p>
					Lv.{user.level}
				</p>
				<p>
					Exp: {user.exp}
				</p>
				<p>
					Gold: {user.gold}
				</p>
			</div>
		</div>
	{/each}
</div>
