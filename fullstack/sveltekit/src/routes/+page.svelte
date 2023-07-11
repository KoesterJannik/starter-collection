<script lang="ts">
	import { fade } from 'svelte/transition';

	type GameClass = {
		name: string;
		avatar: string;
		description: string;
	};
	// op
	let registerStatus = 'CLASS SELECTION';
	let username = '';
	let password = '';
	let dataFree = false;
	$: completeData = username != '' && password != '';

	$: {
		if (completeData) {
			console.log('complete data');
			fetch('/api/check-register', {
				method: 'POST',
				body: JSON.stringify({
					username: username,
					password: password
				}),
				headers: {
					'Content-Type': 'application/json'
				}
			})
				.then((res) => res.json())
				.then((data) => {
					if (data.message == 'Hello World') {
						dataFree = true;
						return;
					} else {
						dataFree = false;
					}
					console.log(data);
				})
				.catch((err) => {
					dataFree = false;
					console.log(err);
				});
		}
	}

	let classes: GameClass[] = [
		{
			name: 'Roque',
			avatar: '/classes/roque.png',
			description:
				'Roque is a cunning and agile adventurer, skilled in the arts of stealth and deception. '
		},
		{
			name: 'Sorcerer',
			avatar: '/classes/sorc.png',
			description:
				'Sorcerer is a wielder of arcane magic, tapping into the raw power of the elements and bending them to their will. '
		},
		{
			name: 'Warrior',
			avatar: '/classes/warrior.png',
			description:
				'Warrior is a formidable champion of the battlefield, clad in heavy armor and wielding mighty weapons. With unyielding strength and unwavering resolve, they charge into the fray, standing as a bulwark against the forces of darkness.'
		}
	];

	async function registerUser() {
		const res = await fetch('/api/register', {
			method: 'POST',
			body: JSON.stringify({
				username: username,
				password: password,
				class: selectedClass!.name
			}),
			headers: {
				'Content-Type': 'application/json'
			}
		});
		const data = await res.json();
		if (data.message == 'success') {
			//redirect to dashboard
			window.location.href = '/dashboard';
		}
		console.log(data);
	}
	let selectedClass: GameClass | null = null;

	function selectClass(c: GameClass) {
		selectedClass = c;
		registerStatus = 'CHOOSE_NAME';
	}
</script>

<div class="bgmainimage min-h-screen bg-black text-gray-100">
	<div class="flex justify-around">
		<a href="/login" class="text-4xl text-center py-4"> Login </a>

		<h1 class="text-4xl text-center py-4" />
	</div>

	<div class="container mx-auto flex flex-col justify-center items-center h-screen">
		<h1 class="text-4xl text-center py-4">Treasure Trove</h1>
		<h1 class="text-4xl text-center py-4">Pick your class</h1>
		<div class="flex md:flex-row items-stretch justify-center my-8 gap-3 flex-wrap">
			{#if registerStatus == 'CLASS SELECTION'}
				{#each classes as c}
					<!-- svelte-ignore a11y-click-events-have-key-events -->
					<div
						class="relative group cursor-pointer"
						on:click={() => selectClass(c)}
						transition:fade
					>
						<img
							src={c.avatar}
							alt={c.name}
							class="h-96 w-72 transition-transform duration-300 transform group-hover:scale-110 {selectedClass &&
							selectedClass === c
								? 'border-4 border-blue-500 scale-110'
								: ''}"
						/>
						<div
							class="absolute bottom-0 left-0 right-0 p-4 bg-gray-800 bg-opacity-75 text-white transform transition-opacity duration-300 opacity-0 group-hover:opacity-100"
						>
							<h2 class="text-lg font-bold">{c.name}</h2>
							<p class="text-sm">{c.description}</p>
						</div>
					</div>
				{/each}
			{/if}

			{#if registerStatus == 'CHOOSE_NAME' && selectedClass}
				<!-- svelte-ignore a11y-click-events-have-key-events -->
				<div class="relative group cursor-pointer" transition:fade>
					<img
						src={selectedClass.avatar}
						alt={selectedClass.name}
						class="h-96 w-72 transition-transform duration-300 transform scale-110"
					/>
					<div
						class="absolute bottom-0 left-0 right-0 p-4 bg-gray-800 bg-opacity-75 text-white transform transition-opacity duration-300 opacity-100"
					>
						<h2 class="text-lg font-bold">{selectedClass.name}</h2>
						<p class="text-sm">{selectedClass.description}</p>
						<form class="mt-4 text-black">
							<label class="block mb-2">
								<span class="text-gray-100">Username:</span>
								<input type="text" bind:value={username} class="mt-1 block w-full" />
							</label>
							<label class="block mb-2">
								<span class="text-gray-100">Password:</span>
								<input type="password" bind:value={password} class="mt-1 block w-full" />
							</label>

							{#if completeData && dataFree}
								<button
									on:click={async () => {
										const res = await registerUser();
									}}
									type="submit"
									class="bg-blue-500 text-white px-4 py-2 rounded">Start your journey</button
								>
							{/if}

							<button
								on:click={() => {
									registerStatus = 'CLASS SELECTION';
									selectedClass = null;
								}}
								type="submit"
								class="bg-red-500 text-white px-4 py-2 rounded">Back</button
							>
							{#if !dataFree}
								<p class="text-red-500">Username already taken</p>
							{:else}
								<p class="text-green-500">Username is available</p>
							{/if}
						</form>
					</div>
				</div>
			{/if}
		</div>
	</div>
</div>

<style>
</style>
