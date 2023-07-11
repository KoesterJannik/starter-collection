<script lang="ts">
	import type { User } from '@prisma/client';

	export let user: User;
	export let requiredExpForNextLevel: number;
</script>

<div class="container w-full max-w-xl h-96 mx-auto bg-yellow-100 bg-opacity-40">
	<div class="Helmet max-w-full">
		<img src="/icons/helmet-placeholder.svg" class="w-full" />
	</div>
	<div class="Shoulders max-w-full">
		<img src="/icons/armor-placeholder.svg" class="w-full" />
	</div>
	<div class="Boots max-w-full">
		<img src="/icons/boots-placeholder.svg" class="w-full" />
	</div>
	<div class="Chest max-w-full">
		<img src="/icons/armor-placeholder.svg" class="w-full" />
	</div>
	<div class="Gloves max-w-full">
		<img src="/icons/armor-placeholder.svg" class="w-full" />
	</div>
	<div class="Weapon max-w-full">
		<img src="/icons/weapon-placeholder.svg" class="w-full" />
	</div>
	<div class="Image max-w-full bg-green-600">
		<img src={`/classes/${user.race.toLowerCase()}.png`} class="w-full" alt="char" />
		<p class="text-md text-center">
			{user.username}
		</p>
		<p class="text-md text-center">
			Lv. {user.level}
		</p>
		<div class="life-bar relative mb-2">
			<div class="bg-green-500 h-2 w-full absolute" />
			<!-- Add green background for full 100% -->
			<div
				class="bg-red-500 h-2 absolute"
				style={`width: ${requiredExpForNextLevel / user.exp}%`}
			/>
		</div>
		<p class="text-sm text-center">
			EXP: {user.exp}/
			{requiredExpForNextLevel}
		</p>
	</div>
	<div class="Stats max-w-full flex flex-col justify-between">
		<p class="text-md flex gap-2">
			<img src="/icons/goldcoin.png" class="w-8 h-8" />
			{user.gold}
		</p>
		<p class="text-md">
			Race: {user.race}
		</p>
		<p class="text-md">
			Life: {user.life}
		</p>
		<p class="text-md">
			Strength: {user.strength}
		</p>
		<p class="text-md">
			Intelligence: {user.intelligence}
		</p>
		<p class="text-md">
			Dexterity: {user.dexterity}
		</p>
		<p class="text-md">
			Won PVM Fights: {user.wonNpcFights}
		</p>
		<p class="text-md">
			Lost PVM Fights: {user.lostNpcFights}
		</p>
		<p class="text-md">
			Total PVM Fights: {user.wonNpcFights + user.lostNpcFights}
		</p>
		<p class="text-md">
			Won PVP Fights: {user.wonPlayerFights}
		</p>
		<p class="text-md">
			Lost PVP Fights: {user.lostPlayerFights}
		</p>
		<p class="text-md">
			Total PVP Fights: {user.wonPlayerFights + user.lostPlayerFights}
		</p>
	</div>
	<div class="Inventory bg-orange-400 bg-opacity-75">iventory</div>
</div>

<style>
	.container {
		display: grid;
		grid-template-columns: 1fr 1fr 1fr 1fr;
		grid-template-rows: 1fr 1fr 1fr 1fr 1fr;
		gap: 0px 0px;
		grid-auto-flow: row;
		grid-template-areas:
			'Shoulders Helmet Stats Stats'
			'Chest Image Stats Stats'
			'Gloves Image Stats Stats'
			'Boots Weapon Stats Stats'
			'Inventory Inventory Inventory Inventory';
	}

	.Helmet {
		grid-area: Helmet;
	}

	.Shoulders {
		grid-area: Shoulders;
	}

	.Boots {
		grid-area: Boots;
	}

	.Chest {
		grid-area: Chest;
	}

	.Gloves {
		grid-area: Gloves;
	}

	.Weapon {
		grid-area: Weapon;
	}

	.Image {
		grid-area: Image;
	}

	.Stats {
		grid-area: Stats;
	}
	.Inventory {
		grid-area: Inventory;
	}
</style>
